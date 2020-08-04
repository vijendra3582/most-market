import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  constructor(private api: ApiClient) { }

  save(data) {
    return this.api.post("wishlist/save", data);
  }

  remove(id) {
    return this.api.delete("wishlist/remove/" + id);
  }

}
