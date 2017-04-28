import { Injectable, Type } from '@angular/core';

import { Logger } from './logger.service';
import { User } from './user';


const USERS = [
  new User('Windstorm', 'Weather mastery'),
  new User('windstorm', 'Weather mastery'),
  new User('Mr. Nice', 'Killing them with kindness'),
  new User('Magneta', 'Manipulates metalic objects')
];

@Injectable()
export class BackendService {
  constructor(private logger: Logger) {}

  getAll(type: Type<any>): PromiseLike<any[]> {
    if (type === User) {
      // TODO get from the database
      return Promise.resolve<User[]>(USERS);
    }
    let err = new Error('Cannot get object of this type');
    this.logger.error(err);
    throw err;
  }
}
