import { Component, OnInit } from "@angular/core";
import { HomeService } from "src/app/services/home.service";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  homeSliderConfig = { slidesToShow: 6, slidesToScroll: 4 };

  isTracking = false;
  currentLat = 0;
  currentLong = 0;
  homeSlider = [];
  homeCuisine = [];
  homePopular = [];
  homeMostPopulor = [];

  searchForm: FormGroup;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Most Market');
  }

  ngOnInit() {
    this.setSearchForm();
    this.currentPosition();
    this.getDetails();
  }

  getDetails() {
    this.homeService
      .details({ "current_lat": this.currentLat, "current_long": this.currentLong })
      .subscribe((data) => {
        this.homeSlider = data.data.slider;
        this.homeCuisine = data.data.cuisine;
        this.homePopular = data.data.popular;
        this.homeMostPopulor = data.data.most_popular;
      });
  }

  currentPosition() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  parse(data) {
    return JSON.parse(data);
  }

  truncate(input) {
    return input.length > 40 ? `${input.substring(0, 40)}...` : input;
  }

  setSearchForm() {
    this.searchForm = new FormGroup({
      query: new FormControl(null, [Validators.required])
    });
  }

  search() {
    let query = this.searchForm.value.query;
    this.router.navigateByUrl('/search?query=' + query);
  }
}
