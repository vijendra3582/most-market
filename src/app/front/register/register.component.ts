import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LocationService } from "src/app/services/location.service";
import { AuthService } from "src/app/services/auth.service";
import { CommonService } from "src/app/services/common.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { ValidateNumber } from "src/app/validations/custom.validators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  server_message: any = {};
  registerData: any = {};

  states: any = [];
  cities: any = [];

  currentStepForm = 0;

  errorMessage: String;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Registration - Most Market");
  }

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
    this.locationService.getState(country_id).subscribe((result) => {
      this.states = result;
    });
  }

  getCity() {
    let state_id = this.registerData.state;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe((result) => {
      this.cities = result;
    });
  }

  setValues() {
    this.submitted = false;
    this.currentStepForm = 0;
    this.registerData = {};
    this.registerData.email = "";
    this.registerData.password = "";
    this.registerData.confirm_password = "";
    this.registerData.name = "";
    this.registerData.mobile = "";
    this.registerData.address = "";
    this.registerData.city = "";
    this.registerData.state = "";
    this.registerData.country = 101;
    this.registerData.profession = "";
  }

  setForm() {
    this.registerForm = this.fb.group({
      email: [
        this.registerData.email,
        [
          Validators.email,
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2),
        ],
      ],
      password: [
        this.registerData.password,
        [Validators.required, Validators.minLength(8)],
      ],
      confirm_password: [
        this.registerData.confirm_password,
        [Validators.required, this.confirmationValidator],
      ],
      name: [
        this.registerData.name,
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2),
        ],
      ],
      mobile: [
        this.registerData.mobile,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          ValidateNumber,
        ],
      ],
      address: [
        this.registerData.address,
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2),
        ],
      ],
      city: [this.registerData.city, [Validators.required]],
      state: [this.registerData.state, [Validators.required]],
      profession: [this.registerData.profession, [Validators.required]],
    });
  }

  register() {
    this.submitted = true;
    this.authService.register(this.registerData).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.setValues();
      this.errorMessage = data.message;
      this.router.navigateByUrl('/auth/login');
    } else {
      this.errorMessage = data.message;
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

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.confirm_password.updateValueAndValidity());
  }
}
