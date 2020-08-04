import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;
  url: String;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {
    const url = this.router.url;
    this.url = url.split('/')[2];
    this.user = tokenService.getUser();
  }

  ngOnInit() {
  }

  logout() {
    this.tokenService.logout();
    this.router.navigateByUrl('/');
  }
}
