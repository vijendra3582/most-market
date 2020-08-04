import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  constructor(private api: ApiClient) { }

  save(data) {
    return this.api.post("user/wishlist/insert", data);
  }

  remove(id) {
    return this.api.delete("user/wishlist/delete/" + id);
  }

  single(id) {
    return this.api.get("user/wishlist/single/" + id);
  }

  all() {
    return this.api.get("user/wishlist/all" );
  }
}
