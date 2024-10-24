import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  user$: Observable<User | null>;
  msg: any;

  constructor(private auth: Auth, private route: Router, private snackBar: MatSnackBar) {
    this.user$ = authState(this.auth);
    this.user$.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  async signUp(email: any, password: any, displayName: any) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
  }

  async signIn(email: any, password: any) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      this.handleAuthError('invalid credentials!');
      console.error("Error signing in", error);
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.route.navigate(["/Login"]);
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  public handleAuthError(error: any) {
    let message: any;
    if (error === 'invalid credentials!') {
      message = 'Email or password is invalid!';
      this.msg = message;
    }
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.snackBar.open('Password reset email sent. Check your inbox!', '', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Error sending password reset email. Try again.', '', { duration: 3000 });
    }
  }
}
