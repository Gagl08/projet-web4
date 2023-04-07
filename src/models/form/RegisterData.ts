export class RegisterData {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public birthdate: string = "",
    public password: string = "",
    public confirmPassword: string = ""
  ) {}
}
