import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetail } from '../model/userData';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // tslint:disable:no-inferrable-types
  userDetails: FormGroup;
  user: UserDetail = new UserDetail();
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

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
    if (this.userDetails.valid) {
      this.userService.createUser(this.user).subscribe(
        result => console.log(result)
      );
      const link = `test/${this.user.email}`;
      this.router.navigate([link]);
    }
  }
  // on reset
  reset(): any {
    this.submitted = false;
    this.userDetails.reset();
  }

}
