import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})

export class ListingComponent implements OnInit {
  query: String;
  url: String;
  url_slug: String;

  searchData: any;
  selected_categories: any;
  selected_sub_categories: any;
  selected_brands: any;

  categories = [];
  sub_categories = [];
  brands = [];
  products = [];
  most_popular = [];
  top = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {
    this.query = this.activatedRoute.snapshot.queryParamMap.get('query');
    const url = this.router.url;
    this.url = url.split('/')[1];
    this.url_slug = url.split('/')[2];
  }

  ngOnInit() {
    this.setSearch();
    this.currentPosition();
    this.details();
  }

  setSearch() {
    this.searchData = {};
    this.searchData.query = this.query;
    this.searchData.query_slug = this.url_slug;
    this.searchData.currentLat = "";
    this.searchData.currentLong = "";
    this.searchData.category = [];
    this.searchData.sub_category = [];
    this.searchData.brand = [];

    this.selected_categories = [];
    this.selected_sub_categories = [];
    this.selected_brands = [];
  }

  currentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.searchData.currentLat = position.coords.latitude;
        this.searchData.currentLong = position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  details() {
    this.searchData.category = this.searchData.category.toString(',');
    this.searchData.sub_category = this.searchData.sub_category.toString(',');
    this.searchData.brand = this.searchData.brand.toString(',');
    this.homeService.listing(this.searchData).subscribe(
      data => {
        this.categories = data.data.categories;
        this.sub_categories = data.data.sub_categories;
        this.brands = data.data.brands;
        this.products = data.data.products;
        this.most_popular = data.data.most_popular;
        this.top = data.data.top;
        this.checkUrl();
      }
    )
  }

  checkUrl() {
    if (this.url == 'category') {
      let category = this.categories.find(cat => cat.slug === this.url_slug);
      this.selected_categories.push(category.id);
    }
  }

  selectCategory(isChecked: Boolean, id: Number) {
    if (isChecked) {
      this.selected_categories.push(id);
    } else {
      let index = this.selected_categories.indexOf(id);
      this.selected_categories.splice(index, 1);
    }
    this.filter();
  }

  selectBrand(isChecked: Boolean, id: Number) {
    if (isChecked) {
      this.selected_brands.push(id);
    } else {
      let index = this.selected_brands.indexOf(id);
      this.selected_brands.splice(index, 1);
    }
    this.filter();
  }

  filter() {
    this.searchData.query_slug = "";
    this.searchData.category = this.selected_categories.toString(',');
    this.searchData.sub_category = this.selected_sub_categories.toString(',');
    this.searchData.brand = this.selected_brands.toString(',');
    this.homeService.filter(this.searchData).subscribe(
      data => {
        this.products = data.data;
      }
    )
  }

  parse(data) {
    return JSON.parse(data);
  }

  truncate(input) {
    return input.length > 40 ? `${input.substring(0, 40)}...` : input;
  }
}
