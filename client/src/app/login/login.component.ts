import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
    data_object = {};
  constructor(private http: Http) {}
  ngOnInit() {
  }

  login_request(){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify('test data');
      return this.http.post('/auth', body, headers).map((res: Response) => res.json());
  }

    check_login(){
        this.login_request().subscribe();
  }

}
