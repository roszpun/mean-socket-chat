import { Injectable, Input, OnChanges} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";

@Injectable()
export class SocketService {
  private url = 'http://127.0.0.1:3000/';
  private socket;
  taken_nick;
  user_name;
  room_id;
  @Input() rooms;


  get_user(){
    this.socket.emit('get_username');
    this.socket.on('return_username', (data) => {
      this.user_name = data;
    });
  }


  sendMessage(message){
    this.socket.emit('new message', message);
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

  update_stuff(){
    this.get_all_rooms();
  }


  constructor(private router: Router) {

    this.socket = io(this.url);
    this.socket.on('connect', (data) => {
      console.log(this.socket.io.engine.id)
    });

    this.socket.on('update-messages', (data) => {
      this.update_stuff();
    });

  }

  send_message(){
    this.socket.emit('new-message', 'cos');
  }


  get_all_rooms(){
    this.socket.emit('get_rooms');
    this.socket.on('return_rooms', (data) => {
      this.rooms = data;
    });
  }

}
