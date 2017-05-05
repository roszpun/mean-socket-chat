import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
    connection;
    login_name = '';

  constructor(private http: Http, private socketService: SocketService) {}
  ngOnInit() {
      this.connection = this.socketService.observe_username();
  }

  set username(value){
      this.login_name = value;
  }

    check_login(){
        this.socketService.checkLogin(this.login_name);
  }

  login_status(){
        return this.login_name === this.socketService.taken_nick;
  }
}
