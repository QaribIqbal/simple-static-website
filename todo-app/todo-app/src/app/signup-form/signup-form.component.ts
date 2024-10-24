import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  sub: boolean = false;
  signupform = new FormGroup({
    First_name: new FormControl('', [Validators.required]),
    Last_name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService) {}

  markAllAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  async Signup_submit() {
    if (this.signupform.valid) {
      console.log(this.signupform.value);
      this.sub = true;
      const { First_name, Last_name, Email, Password } = this.signupform.value;
      const displayName = `${First_name} ${Last_name}`;
      await this.authService.signUp(Email, Password, displayName);
    } else {
      this.markAllAsTouched(this.signupform);
      alert("Form not Valid!");
    }
  }
}
