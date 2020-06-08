import { Injectable } from "@angular/core";
import { ApiClient } from '../common/api.client';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class BundleService {

    constructor(private api: ApiClient) { }

    insert(data) {
        return this.api.post('bundle/insert', data);
    }

    import(data) {
        return this.api.post('bundle/import', data);
    }

    importProductData(data) {
        return this.api.post('bundle/importProduct', data);
    }

    update(data) {
        return this.api.put('bundle/update', data);
    }

    delete(bundle_id) {
        return this.api.delete('bundle/delete/' + bundle_id);
    }

    all(
        pageIndex: number = 1,
        pageSize: number = 10,
        sortField: string,
        sortOrder: string,
        search: object
    ): Observable<any> {
        let params = new HttpParams()
            .append('page', `${pageIndex}`)
            .append('results', `${pageSize}`)
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);

        Object.keys(search).forEach(function (key) {
            params = params.append(key, search[key]);
        });

        return this.api.getO('bundle/all', params);
    }

    single(bundle_id) {
        return this.api.get('bundle/single/' + bundle_id);
    }
    
    changeFeatured(data){
        return this.api.put('bundle/changeFeatured', data);
    }
    
    changeStatus(data){
        return this.api.put('bundle/changeStatus', data);
    }
    
    changeStock(data){
        return this.api.put('bundle/changeStock', data);
    }
    
    changeDiscount(data){
        return this.api.put('bundle/changeDiscount', data);
    }
    
    changeTax(data){
        return this.api.put('bundle/changeTax', data);
    }
}