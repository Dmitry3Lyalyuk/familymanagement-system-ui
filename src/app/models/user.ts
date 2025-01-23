export interface IUser {
  id: string;
  userName: string;
  country: Country;
  email: string;
}
export enum Country {
  Russia,
  Poland,
  England,
  Germany,
  Spain,
  Turkey,
  Belarus,
}
