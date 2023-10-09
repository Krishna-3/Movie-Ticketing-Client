import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({

      username: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z][A-Za-z_0-9]{7,30}$/g)
        ]
      }),

      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g)
        ]
      })
    });
  }

  signup() {
    console.log(this.loginForm.getRawValue());
  }
}
