import {Injectable} from '@angular/core';

import {User} from './user';
import {BackendService} from './backend.service';
import {Logger} from './logger.service';
import * as io from 'socket.io-client'

@Injectable()
export class UserService {
  private users: User[] = [];
  private socket;

  constructor(private backend: BackendService,
              private logger: Logger) {
    this.getUsers();

    this.socket.on('news', function (data) {
      console.log(data);
      this.socket.emit('my other event', { my: 'data' });
    });
  }

  /*ngOnInit() {
    this.heroes = this.service.getHeroes();
  }*/

  validate(username: string, password: string): boolean {
    for (let i=0 ; i<this.users.length ; i++) {
      let user : User = this.users[i];
      if (user.name === username && user.password === password)
        return true;
    }
    return false;
  }

  getUsers() {
    this.backend.getAll(User).then((users: User[]) => {
      this.logger.log(`Fetched ${users.length} users.`);
      this.users.push(...users); // fill cache
    });
    return this.users;
  }
}

