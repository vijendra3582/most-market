import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private api: ApiClient) {}

  details(data) {
    return this.api.post("home/details", data);
  }

  getVendor(slug) {
    return this.api.get("home/vendor/" + slug);
  }

  getProducts(slug) {
    return this.api.get("home/products/" + slug);
  }

  listing(data) {
    return this.api.post("home/listing", data);
  }

  filter(data) {
    return this.api.post("home/filter", data);
  }
}
