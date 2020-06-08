import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  server_message: any = {};
  registerData: any = {};
  states: any = [];
  cities: any = [];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private authService: AuthService,
    private siteData: ConstantsService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setValues();
    this.setForm();
    this.getState();
  }

  getState() {
    let country_id = this.registerData.country;
    if (!country_id) {
      return;
    }
    this.locationService.getState(country_id).subscribe(result => {
      this.states = result;
    });
  }

  getCity(type) {
    let state_id = this.registerData.state;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result;
    });
  }

  setValues() {
    this.registerData.name = null;
    this.registerData.email = null;
    this.registerData.mobile = null;
    this.registerData.password = null;
    this.registerData.confirm_password = null;
    this.registerData.address = null;
    this.registerData.pincode = null;
    this.registerData.city = null;
    this.registerData.state = null;
    this.registerData.country = 101;
    this.registerData.profession = null;
  }

  setForm() {
    this.registerForm = this.fb.group({
      name: [this.registerData.name, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      email: [this.registerData.email, [Validators.email, Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      mobile: [this.registerData.mobile, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]],
      password: [this.registerData.password, [Validators.required, Validators.minLength(8)]],
      confirm_password: [this.registerData.confirm_password, [Validators.required, this.confirmationValidator]],
      address: [this.registerData.address, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      pincode: [this.registerData.pincode, [Validators.required, Validators.maxLength(10), Validators.minLength(2), ValidateNumber]],
      city: [this.registerData.city, [Validators.required]],
      state: [this.registerData.state, [Validators.required]],
      profession: [this.registerData.profession, [Validators.required]]
    });
  }

  register() {
    this.submitted = true;
    this.authService.registerVendor(this.registerData).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.router.navigateByUrl('/auth/login');
    } else {
    }
  }

  handleError(error) {
    this.server_message = error.error.message.errors;
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

}
