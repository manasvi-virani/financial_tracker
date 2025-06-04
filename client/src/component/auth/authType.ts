export interface IUserInfo {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  token:string
}
export interface IUserResponse {
messsage: string;
  user: IUserInfo ;
}