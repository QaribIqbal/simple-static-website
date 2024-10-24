import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ServiceService } from '../services/service.service';
import { Auth, authState, sendPasswordResetEmail, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule,],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})
export class SigninFormComponent {
  signinform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(public auth: Auth, public authService: AuthService, private service: ServiceService, private route: Router) { };
  async Signin_submit() {
    const { email, password } = this.signinform.value;

    await this.authService.signIn(email, password);

    authState(this.auth).subscribe((user: User | null) => {
      if (user) {
        this.route.navigate(["/Home"]);
      }
    })
  }
  async forgotPassword() {
    const email = this.signinform.get('email')?.value;
    if (!email) {
      alert('Please enter your email address to reset the password.');
      return;
    }
    try {
      await sendPasswordResetEmail(this.auth, email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Failed to send password reset email. Please try again later.');
    }
  }
}
