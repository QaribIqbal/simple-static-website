import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
    forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  
    message: string | null = null;
  
    constructor(private authService: AuthService) {}
  
    async onSubmit() {
      if (this.forgotPasswordForm.valid) {
        const email = this.forgotPasswordForm.value.email!;
        try {
          await this.authService.resetPassword(email);
          this.message = 'Password reset email sent. Please check your inbox.';
        } catch (error) {
          this.message = 'Error sending password reset email. Try again.';
        }
      }
    }
}
