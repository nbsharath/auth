import firebase from 'firebase/app';
import { InputFirebase, Result } from '../interface/firebase';

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  async signInWithEmailPassword(data: InputFirebase): Promise<Result> {
    let result = {
      flag: false,
      error: '',
    };
    // [START auth_signin_password]
    if (data && data.email && data.password) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(async () => {
          result.flag = true;
        })
        .catch((error: any) => {
          result.error = error;
          console.error(error);
        });
    }
    return result;
  }
  async signUpWithEmailPassword(data: InputFirebase): Promise<Result> {
    // [START auth_signin_password]
    let result = {
      flag: false,
      error: '',
    };
    if (data && data.email && data.password) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser!.updateProfile({ displayName: data.name });
          result.flag = true;
        })
        .catch((error) => {
          console.error(error);
          result.error = error;
        });
    }
    return result;
  }
}

let firebaseSrevice = new Firebase();
export default firebaseSrevice;
