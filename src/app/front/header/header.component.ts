import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  is_menu_open = false;
  searchForm: FormGroup;
  
  constructor(
    private tokenService: TokenService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setSearchForm();
  }

  setSearchForm() {
    this.searchForm = new FormGroup({
      query: new FormControl(null, [Validators.required])
    });
  }

  openMenu() {
    if (this.is_menu_open) {
      this.is_menu_open = false;
    } else {
      this.is_menu_open = true;
    }
  }

  logout() {
    this.is_menu_open = false;
    this.tokenService.logout();
    this.router.navigateByUrl('/');
  }

  search() {
    let query = this.searchForm.value.query;
    this.router.navigateByUrl('/search?query=' + query);
  }
}
