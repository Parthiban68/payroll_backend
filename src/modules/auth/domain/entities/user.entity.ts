export class user {
  private constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly mobile_number: number,
    public readonly role: string,
    public readonly country: string,
    public readonly state: string,
    public readonly city: string,
    public readonly pincode: number,
    public readonly password: string
  ) {}

  static register(props: {
    username: string;
    email: string;
    mobile_number: number;
    role: string;
    country: string;
    state: string;
    city: string;
    pincode: number;
    password: string;
  }): user {
    if (!props.username.trim()) throw new Error("Username cannot be empty");

    return new user(
      props.username.trim(),
      props.email.toLowerCase(),
      props.mobile_number,
      props.role,
      props.country,
      props.state,
      props.city,
      props.pincode,
      props.password
    );
  }
}
