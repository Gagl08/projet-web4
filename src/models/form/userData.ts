export class UserData {
  constructor(
    public email: string = "",
    public firstName: string = "",
    public lastName: string = "",
    public bio: string = "",
    public location: string = "",
    public images: string[] = [],
    public birthdate: Date = new Date()
  ) {}
}
