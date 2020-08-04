import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { ValidateNumber } from 'src/app/validations/custom.validators';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  server_message: any = {};
  user: any = {};
  submitted: boolean = false;

  states: any = [];
  cities: any = [];

  currentStepForm = 0;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.get();
    this.setForm();
    this.getState();
  }

  get() {
    this.authService.me().subscribe(
      data => {
        this.user = data.user;
        this.setForm();
        this.getState();
      }
    );
  }

  getState() {
    let country_id = this.user.country;
    if (!country_id) {
      return;
    }
    this.locationService.getState(country_id).subscribe(result => {
      this.states = result;
      this.getCity();
    });
  }

  getCity() {
    let state_id = this.user.state;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result;
    });
  }

  setForm() {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.email, Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      name: [this.user.name, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      mobile: [this.user.mobile, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]],
      address: [this.user.address, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      city: [this.user.city, [Validators.required]],
      state: [this.user.state, [Validators.required]],
      profession: [this.user.profession, [Validators.required]]
    });
  }

  submit() {
    this.submitted = true;
    this.authService.profile(this.user).subscribe(
      data => {
        this.tokenService.updateUser(data.user[0]);
        this.ngOnInit();
      }
    );
  }

}
