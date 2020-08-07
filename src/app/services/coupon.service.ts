import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})
export class CouponService {
    constructor(private api: ApiClient) { }

    check(data) {
        return this.api.post("user/coupon/check", data);
    }
}
