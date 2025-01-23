import { faker } from '@faker-js/faker';
import UserInterface from '../interfaces/userData';

export default class User implements UserInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  constructor() {
    this.first_name = faker.person.firstName();
    this.last_name = faker.person.lastName();
    this.email = faker.internet.email({
      firstName: this.first_name,
      lastName: this.last_name,
    });
    this.username = faker.internet.userName({
      firstName: this.first_name,
      lastName: this.last_name,
    });
    this.password = faker.internet.password({ length: 15, memorable: true });
  }

  copy(): UserInterface {
    return { ...this } as UserInterface;
  }
}
