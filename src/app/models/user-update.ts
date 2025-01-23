export interface IUserUpdate {
  id: string;
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
