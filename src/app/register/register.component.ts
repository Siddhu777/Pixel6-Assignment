import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSpinner = false;
  //  isPanValid = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
  addCustomerFG = new FormGroup({
    PanNumber: new FormControl('', [Validators.maxLength(10), Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]),
    Name: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    Mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]),
    Email: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.email]),
    Address1: new FormControl('', Validators.required),
    Address2: new FormControl(''),
    PostCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    State: new FormControl(''),
    City: new FormControl(''),
  })
  obj: any = {
    "Name": ''
  }
  constructor(private service: AuthService, private router: Router) { }
  ngOnInit(): void {
  }
  fnVerifyPan(pan: any) {
    this.showSpinner = true;
    if (this.addCustomerFG.controls['PanNumber'].valid) {
      this.service.verifyPan(pan.target.value).subscribe((FullName: any) => {
        this.obj = FullName;
        this.addCustomerFG.controls['Name'].patchValue(this.obj[0].Name, { onlySelf: true, emitEvent: false })
      })
    }
    this.addCustomerFG.controls['Name'].reset()
  }
  fnFocusOut() {
    this.showSpinner = false;
  }
  oneState: any;
  oneCity: any;
  obj2: any = [{
    "State": '',
    "City": ''
  }]
  GetPostCode(e: any) {
    this.service.getPostcodeDetails(e.target.value).subscribe((adress: any) => {
      this.oneState = adress;
      this.oneCity = adress;
    })
  }
 
  //Submit Registration form
  onSubmit() {
    if (this.addCustomerFG.valid) {
      this.service.addCustomer(this.addCustomerFG.value).subscribe((res: any) => {
        this.router.navigate(['home'])
      })
    }
  }
}
