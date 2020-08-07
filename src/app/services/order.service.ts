import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    constructor(private api: ApiClient) { }

    place(data) {
        return this.api.post("user/order/place", data);
    }

    all() {
        return this.api.get("user/order/all");
    }
}
