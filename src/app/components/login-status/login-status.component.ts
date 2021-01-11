import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { resourceUsage } from 'process';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;
        }
      );
    }
  }

  logout(){
    this.oktaAuthService.signOut();
  }

}
