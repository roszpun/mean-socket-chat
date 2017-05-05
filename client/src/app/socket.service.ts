import { Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class SocketService {
  private url = 'http://127.0.0.1:3000/';
  private socket;
  taken_nick;
  user_name;


  get_user(){
    this.socket.emit('get_username');
    this.socket.on('return_username', (data) => {
      this.user_name = data;
    });
  }


  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  checkLogin(username){
    this.socket.emit('new_user', username);
  }

  observe_username(){
    this.socket.on('username_free', (data) => {
      this.socket.nickname = data;
      this.router.navigate(['/chat']);
    });
    this.socket.on('username_taken', (data) => {
      this.taken_nick = data;
    });
  }

  redirect_to_login(){
    this.router.navigate(['/']);
  }


  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  constructor(private router: Router) {
    this.socket = io(this.url);
    this.socket.on('connect', (data) => {
      console.log(this.socket.io.engine.id)
    });

  }

}
