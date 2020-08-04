import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})
export class AddressService {
    constructor(private api: ApiClient) { }

    save(data) {
        return this.api.post("user/address/insert", data);
    }

    update(data) {
        return this.api.put("user/address/update", data);
    }

    delete(id) {
        return this.api.delete("user/address/delete/" + id);
    }

    all() {
        return this.api.get("user/address/all");
    }

    single(id) {
        return this.api.get("user/address/single/" + id);
    }
}
