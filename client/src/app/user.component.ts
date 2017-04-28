import { Component }       from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector:    'userlogin',
  template: `
    <h2>User login</h2>
    Name: <input #username (change)="0">
    Password: <input #userpassword (change)="0">
    
    <div *ngIf="username.value && userpassword.value">
    Login is
     {{ login(username.value, userpassword.value) ? "VALID" : "INVALID" }}
    </div>
  `,
   providers: [UserService]
})
export class UserComponent {
  //constructor() { }
   constructor(private userService: UserService) { }

   login(username: string, userpassword: string) {
     console.log("Login ("+username+") ("+userpassword+")");
    return this.userService.validate(username, userpassword);
  }
}
