import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserDetail } from '../model/userData';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userDetails: FormGroup;
  user: UserDetail = new UserDetail();
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userDetails = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  get f(): any {
    return this.userDetails.controls;
  }
  // on submit
  submit(): any {
    this.submitted = true;
    console.log(this.user);
  }
  // on reset
  reset(): any {
    this.submitted = false;
    this.userDetails.reset();
  }

}
