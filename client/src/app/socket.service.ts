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

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  checkLogin(username){
    this.socket = io(this.url);
    this.socket.emit('new_user', username);
  }

  observe_username(){
    this.socket = io(this.url);
    this.socket.on('username_free', (data) => {
      this.socket.nickname = data;
      this.router.navigate(['/chat']);
    });
    this.socket.on('username_taken', (data) => {
      this.taken_nick = data;
    });
  }

  login_status(){
    return
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  constructor(private router: Router) { }

}
