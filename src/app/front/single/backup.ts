import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HomeService } from "src/app/services/home.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/cart.service";

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

  constructor(
    private homeService: HomeService,
    private titleService: Title,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.titleService.setTitle("Most Market");
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.getVendor(this.slug);
    this.getProducts(this.slug);
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

  add(product) {
    this.cartService.save(product).subscribe(
      data => {
        this.cartProductList.push(JSON.parse(data.data.details));
      }
    );

    const productExistInCart = this.cartProductList.find(
      ({ id }) => id === product.id
    );

    if (!productExistInCart) {
      this.cartProductList.push({ ...product, quantity: 1 });
      return;
    }
    productExistInCart.quantity += 1;
    console.log(this.cartProductList);
  }

  update(product){
    
  }

  remove(product) {
    const productExistInCart = this.cartProductList.find(
      ({ id }) => id === product.id
    );
    productExistInCart.quantity = productExistInCart.quantity - 1;
    if (productExistInCart.quantity) {
      this.cartProductList = this.cartProductList.map((item) => {
        if (item.id === product.id) {
          item = productExistInCart;
        }
        return item;
      });
    } else {
      this.cartProductList = this.cartProductList.filter(
        ({ id }) => id !== product.id
      );
    }
    this.getTotalAmout();
  }

  getTotalAmout() {
    return this.cartTotalAmount = this.cartProductList.reduce(function (res, item) {
      return res + (item.sale_price * item.quantity);
    }, 0);
  }
}
