let nextUserId = 1;

export class User {
  public id: number;
  public name: string;
  public password: string;

  constructor(
    name: string,
    password: string) {
    this.id = nextUserId++;
    this.name = name;
    this.password = password;
  }
}
