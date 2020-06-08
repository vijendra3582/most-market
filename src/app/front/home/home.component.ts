import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  vendorSlides = [
    { image: "assets/images/qw1.png", title: "VJ Restro" },
    { image: "assets/images/qw2.png", title: "VJ Restro" },
    { image: "assets/images/qw3.png", title: "VJ Restro" },
    { image: "assets/images/qw4.png", title: "VJ Restro" },
    { image: "assets/images/qw5.png", title: "VJ Restro" },
    { image: "assets/images/qw6.png", title: "VJ Restro" },
    { image: "assets/images/qw7.png", title: "VJ Restro" }
  ];

  vendorSlidesConfig = { "slidesToShow": 6, "slidesToScroll": 4 };

  constructor() { }

  ngOnInit() {
  }

}
