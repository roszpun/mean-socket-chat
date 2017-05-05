import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {SocketService} from '../socket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, DoCheck {
    chat = {
        rooms: [{_id: '', name: '', description: ''}],
        messages: [{room_id: ''}]
    };
    current_room_messages = [];
    current_room = {};
    current_room_id = '';
    user_login = '';
    textarea_message = '';
    room_name = '';
    room_textarea = '';
    modal_status = false;
    user_id = this.socketService.socket_id();
    error_room = false;

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
        }, 250);
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
        this.chat = this.socketService.rooms;
        if (this.current_room_id != '') {
            this.open_room(this.current_room_id);
        }
    }

    trigger_send_message() {
        let obj = {
            body: this.textarea_message,
            author: this.user_login,
            room_id: this.current_room_id,
        };
        if (this.textarea_message == '') {
            return
        }
        this.socketService.send_message(obj);
        setTimeout(() => {
            var objDiv = document.getElementById("scroller");
            objDiv.scrollTop = objDiv.scrollHeight + 90;
            this.textarea_message = '';
        }, 50)

    }

    open_modal() {
        this.modal_status = true;
    }

    close_modal() {
        this.modal_status = false;
    }

    trigger_create_room() {
        let obj = {
            name: this.room_name,
            author: this.user_login,
            description: this.room_textarea
        };
        this.error_room = false;
        if (obj.name == '') {
            this.error_room = true;
            console.log(this.error_room);
            return
        }
        this.socketService.create_room(obj);
        this.close_modal();
    }


}
