import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    task: new FormControl('', [Validators.required]),
    active: new FormControl(''),
    date: new FormControl('', [Validators.required])
  });
  showForm = false;

  constructor(public auth: AuthService, private service: ServiceService, private snackBar: MatSnackBar) {}

  LogOut() {
    this.auth.signOut();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  async saveTask() {
    if (this.form.valid) {
      const taskData = this.form.getRawValue();
      taskData.active = 'true';
      await this.service.save(taskData);
      this.snackBar.open('Task added successfully!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['task-added-snackbar']
      });
      this.form.reset();
      this.showForm = false; // Hide the form after saving
    } else {
      this.snackBar.open('Please fill out all fields!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['task-error-snackbar']
      });
      this.markAllAsTouched(this.form);
    }
  }

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
}
