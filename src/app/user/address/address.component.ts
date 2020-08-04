import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { AddressService } from 'src/app/services/address.service';
import { ValidateNumber } from 'src/app/validations/custom.validators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  formOpen = false;
  addressForm: FormGroup;
  address: any;
  button_name: String;
  addresses = [];
  states = [];
  cities = [];
  server_message: any = {};
  submitted = false;
  isSubmitLoading = false;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.addressService.all().subscribe(
      data => {
        this.addresses = data.data.response;
        console.log(this.addresses);
      }
    )
  }

  edit(id) {
    this.addressService.single(id).subscribe(
      data => {
        this.address = data.data;
        this.setForm();
        this.getState();
        this.button_name = "Update Address";
        this.formOpen = true;
      }
    )
  }

  new() {
    if (!this.formOpen) {
      this.formOpen = true;
      this.setValue();
      this.setForm();
      this.getState();
      this.button_name = "Add Address";
    }
    else {
      this.formOpen = false;
    }
  }

  cancel() {
    this.formOpen = false;
  }

  getState() {
    let country_id = this.address.country;
    if (!country_id) {
      return;
    }
    this.locationService.getState(country_id).subscribe(result => {
      this.states = result;
      this.getCity();
    });
  }

  getCity() {
    let state_id = this.address.state;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result;
    });
  }

  setValue() {
    this.address = {};
    this.address.name = "";
    this.address.mobile = "";
    this.address.pincode = "";
    this.address.locality = "";
    this.address.address = "";
    this.address.city = "";
    this.address.state = "";
    this.address.landmark = "";
    this.address.alternate_mobile = "";
    this.address.address_type = "home";
    this.address.country = 101;
  }

  setForm() {
    this.addressForm = this.fb.group({
      name: [this.address.name, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      mobile: [this.address.mobile, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]],
      pincode: [this.address.pincode, [Validators.required, Validators.minLength(6), Validators.maxLength(10), ValidateNumber]],
      locality: [this.address.locality, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      address: [this.address.address, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      city: [this.address.city, [Validators.required]],
      state: [this.address.state, [Validators.required]],
      landmark: [this.address.landmark, [Validators.maxLength(255), Validators.minLength(2)]],
      alternate_mobile: [this.address.alternate_mobile, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]],
      address_type: [this.address.address_type, [Validators.required]]
    });
  }

  submit() {
    this.submitted = true;
    this.isSubmitLoading = true;
    if (this.address.id === undefined) {
      this.addressService.save(this.address).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    } else {
      this.addressService.update(this.address).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data) {
    this.isSubmitLoading = false;
    this.submitted = false;
    if (data.status == true) {
      this.formOpen = false;
      this.get();
    } else {

    }
  }

  handleError(error) {
    this.isSubmitLoading = false;
    this.submitted = false;
    if (error.error.message.name === "SequelizeDatabaseError") {
    } else {
      this.server_message = error.error.message.errors;
    }
  }

  delete(id){
    if(!confirm('Are you sure ?')){
      return;
    }
    this.addressService.delete(id).subscribe(
      data => {
        this.get();
      }
    )
  }
}
