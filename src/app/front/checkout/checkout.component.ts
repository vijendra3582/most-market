import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HomeService } from 'src/app/services/home.service';
import { TokenService } from 'src/app/services/token.service';
import { AddressService } from 'src/app/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartProductList = [];
  cartTotalAmount = 0;
  cartTotalDiscountAmount = 0;

  disabledCartButton = false;
  isLoggedIn = false;
  isAddressSet = false;
  isPaymentSet = false;

  checkoutForm: FormGroup;
  checkout: any;
  server_message: any = {};

  addresses = [];
  coupon_applied = 'notapplied';

  isCouponSubmitLoading = false;
  isOrderSubmitLoading = false;
  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private addressService: AddressService,
    private titleService: Title,
    private cartService: CartService,
    private couponService: CouponService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.titleService.setTitle("Checkout - Most Market");
  }

  ngOnInit() {
    this.checkLogin();
    this.get();
  }

  checkLogin() {
    if (this.tokenService.loggedIn) {
      this.setValue();
      this.setForm();
      this.getAddresses();
      this.isLoggedIn = true;
      this.isAddressSet = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  addressSelect() {
    this.isLoggedIn = true;
    this.isAddressSet = true;
    this.isPaymentSet = true;
  }

  getAddresses() {
    this.addressService.all().subscribe(
      data => {
        this.addresses = data.data.response;
      }
    )
  }

  get() {
    this.cartService.get().subscribe(
      data => {
        data.data.forEach(element => {
          this.cartProductList.push(element);
        });
      }
    )
  }

  increment(product) {
    this.disabledCartButton = true;
    this.cartService.increment({ "product_id": product.id, "quantity": product.quantity }).subscribe(
      data => {
        this.cartProductList = this.cartProductList.map((item) => {
          if (item.id === product.id) {
            item = data.data[0];
          }
          return item;
        });
        this.disabledCartButton = false;
      }
    );
  }

  decrement(product) {
    this.disabledCartButton = true;
    if (product.quantity === 1) {
      this.remove(product);
      return;
    } else {

    }
    this.cartService.decrement({ "product_id": product.id, "quantity": product.quantity }).subscribe(
      data => {
        this.cartProductList = this.cartProductList.map((item) => {
          if (item.id === product.id) {
            item = data.data[0];
          }
          return item;
        });
        this.disabledCartButton = false;
      }
    );
    this.getTotalAmout();
  }

  remove(product) {
    this.disabledCartButton = true;
    this.cartService.remove(product.id).subscribe(
      data => {
        this.cartProductList = this.cartProductList.filter(
          ({ id }) => id !== product.id
        );
        this.disabledCartButton = false;
      }
    );

    this.getTotalAmout();
  }

  getTotalAmout() {
    return this.cartTotalAmount = this.cartProductList.reduce(function (res, item) {
      return res + (item.discount_price * item.quantity);
    }, 0);
  }

  setValue() {
    this.checkout = {};
    this.checkout.address_id = 0;
    this.checkout.coupon_code = "";
    this.checkout.coupon_id = 0;
  }

  setForm() {
    this.checkoutForm = this.fb.group({
      address_id: [this.checkout.address_id, [Validators.required]],
      coupon_code: [this.checkout.coupon_code, []]
    });
  }

  checkCoupon() {
    if (!this.checkout.coupon_code) {
      return;
    }
    this.isCouponSubmitLoading = true;
    this.couponService.check({ "code": this.checkout.coupon_code, "vendor_id": this.cartProductList[0].vendor_id }).subscribe(
      data => {
        let discount_data = data.data;
        if (discount_data) {
          this.checkout.coupon_id = discount_data.id;
          this.coupon_applied = 'valid';
          if (discount_data.discount_type == 'flat') {
            this.cartTotalDiscountAmount = this.cartTotalAmount - discount_data.discount_value;
          } else if (discount_data.discount_type == 'percent') {
            this.cartTotalDiscountAmount = this.cartTotalAmount - (this.cartTotalAmount * (discount_data.discount_value / 100));
          }
          if (this.cartTotalDiscountAmount < 0) {
            this.cartTotalDiscountAmount = 0;
          }
        } else {
          this.coupon_applied = 'invalid';
        }
        this.isCouponSubmitLoading = false;
      }
    )
  }

  order() {
    this.checkout.total_products = this.cartProductList.length;
    this.checkout.total_amount = this.cartTotalAmount;
    this.checkout.total_discount = (this.cartTotalDiscountAmount == 0) ? 0 : (this.cartTotalAmount - this.cartTotalDiscountAmount);
    this.checkout.total_discount_amount = (this.cartTotalDiscountAmount == 0) ? this.cartTotalAmount : this.cartTotalDiscountAmount;
    this.checkout.payment_mode = 'offline';
    this.checkout.payment_platform = 'cash_on_delivery';
    this.checkout.status = 'placed';
    this.checkout.products = this.cartProductList;
    this.isOrderSubmitLoading = true;
    this.orderService.place(this.checkout).subscribe(
      data => {
        this.isOrderSubmitLoading = false;
        this.router.navigateByUrl('/user/order');
      }
    )
  }
}
