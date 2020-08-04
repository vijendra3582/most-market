import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  vendors = [];

  constructor(
    private wishlistService: WishlistService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Manage Wishlist - Most Market');
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.wishlistService.all().subscribe(
      data => {
        this.vendors = data.data;
      }
    )
  }

  parse(data) {
    return JSON.parse(data);
  }

  truncate(input) {
    return input.length > 40 ? `${input.substring(0, 40)}...` : input;
  }

  remove(vendor_id) {
    if(!confirm('Are you sure ?')){
      return;
    }
    this.wishlistService.remove(vendor_id).subscribe(
      data => {
        this.get();
      }
    )
  }
}
