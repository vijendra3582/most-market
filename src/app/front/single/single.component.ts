import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HomeService } from "src/app/services/home.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: "app-single",
  templateUrl: "./single.component.html",
  styleUrls: ["./single.component.scss"],
})
export class SingleComponent implements OnInit {
  slug: String;
  vendor: any;
  products = [];
  cartProductList = [];
  cartTotalAmount = 0;
  disabledCartButton = false;

  constructor(
    private homeService: HomeService,
    private titleService: Title,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.titleService.setTitle("Most Market");
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.getVendor(this.slug);
    this.getProducts(this.slug);
    this.get();
  }

  getVendor(slug) {
    this.homeService.getVendor(slug).subscribe((data) => {
      this.vendor = data.data[0];
      this.titleService.setTitle(this.vendor.name);
    });
  }

  getProducts(slug) {
    this.homeService.getProducts(slug).subscribe((data) => {
      this.products = data.data;
    });
  }

  parse(data) {
    return JSON.parse(data);
  }

  truncate(input) {
    return input.length > 40 ? `${input.substring(0, 40)}...` : input;
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

  add(product) {
    if (this.checkVendor(product)) {
      this.disabledCartButton = true;
      product.quantity = 1;
      if (!this.checkCart(product)) {
        this.cartService.save({ "product_id": product.id, "quantity": product.quantity }).subscribe(
          data => {
            this.cartProductList.push(data.data[0]);
            this.disabledCartButton = false;
          }
        );
      } else {
        this.increment(product);
      }
    }
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
    console.log(product);
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

  checkCart(product) {
    return this.cartProductList.some(function (el) {
      return el.id === product.id;
    });
  }

  checkVendor(product) {
    return this.cartProductList.some(function (el) {
      return el.vendor_id === product.vendor_id;
    });
  }

  getTotalAmout() {
    return this.cartTotalAmount = this.cartProductList.reduce(function (res, item) {
      return res + (item.sale_price * item.quantity);
    }, 0);
  }

  wishlist() {
    const data = { "vendor_id": this.vendor.id };
    if (!this.vendor.is_wishlist) {
      this.wishlistService.save(data).subscribe(
        data => {
          this.vendor = data.data[0];
        }
      )
    } else {
      this.wishlistService.remove(this.vendor.id).subscribe(
        data => {
          this.vendor = data.data[0];
        }
      )
    }
  }
}
