import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {SocketService} from '../socket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, DoCheck {
    chat = {
        rooms: [{_id: '', name: ''}],
        messages: [{room_id: ''}]
    };
    current_room_messages = [];
    current_room = {};
    current_room_id = '';
    user_login = '';

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.socketService.get_all_rooms();
        this.socketService.get_user();
        setTimeout(() => {
            this.chat = this.socketService.rooms;
            this.user_login = this.socketService.user_name;
            if (this.user_login == null) {
                this.socketService.redirect_to_login();
            }
            console.log('chat', this.chat);
        }, 50);
    }

    room_messages(id) {
        let return_messages = [];
        this.chat.messages.forEach(function (message) {
            if (message.room_id == id) {
                return_messages.push(message)
            }
        });
        this.current_room_messages = return_messages;
    }

    open_room(id) {
        this.current_room_id = id;
        let return_room = {};
        this.chat.rooms.forEach(function (room) {
            if (room._id == id) {
                return_room = room;
            }
        });
        this.current_room = return_room;
        this.room_messages(id)

    }

    ngDoCheck() {
        if (this.current_room_id != '') {
            this.chat = this.socketService.rooms;
            this.open_room(this.current_room_id);
        }
    }

    trigger_send_message() {
        this.socketService.send_message()
    }

}
