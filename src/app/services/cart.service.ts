import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private api: ApiClient) { }

  save(data) {
    return this.api.post("cart/save", data);
  }

  increment(data) {
    return this.api.put("cart/increment", data);
  }

  decrement(data) {
    return this.api.put("cart/decrement", data);
  }

  remove(id) {
    return this.api.delete("cart/remove/" + id);
  }

  get() {
    return this.api.get("cart/all");
  }
}
