import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user_login = '';
  constructor(private socketService: SocketService) { }
  ngOnInit() {
    this.socketService.get_user();
    setTimeout( () => {
      this.user_login = this.socketService.user_name;
      if(this.user_login == null){
        this.socketService.redirect_to_login();
      }
    }, 50);

  }

}
