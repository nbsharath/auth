export interface InputFirebase {
  method: String;
  email: string;
  password: string;
  name: string;
}

export interface ChatList {
  _id: String;
  timestamp: string;
}

export interface Result {
  flag: boolean;
  error: string;
}

export interface User {
  email: string;
  name: string;
  uid: string;
}
