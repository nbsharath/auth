import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputFirebase } from '../interface/firebase';
import firebase from './firebase';

class AuthenticationService {
  constructor() {}

  // SIGN IN and SIGN UP
  signInOrSignupAsync = async (
    data: InputFirebase,
    signIn: boolean,
    dispatch: any
  ) => {
    let result;
    if (signIn) {
      result = await firebase.signInWithEmailPassword(data);
    } else {
      result = await firebase.signUpWithEmailPassword(data);
    }

    // store the token in the async storeage
    if (result.flag) {
      // Store this in database
      await AsyncStorage.setItem('userToken', 'IN');
      dispatch({ type: 'SIGN_IN', token: 'IN' });
    }
    return result;
  };

  authentication = (dispatch: any) => ({
    signIn: async (data: InputFirebase) => {
      return await this.signInOrSignupAsync(data, true, dispatch);
    },
    signOut: async () => {
      await AsyncStorage.setItem('userToken', 'NOT');
      dispatch({ type: 'SIGN_OUT' });
    },
    signUp: async (data: InputFirebase) => {
      return await this.signInOrSignupAsync(data, false, dispatch);
    },
  });

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async (dispatch: any) => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log('Could not silently login ', e);
    }

    if (userToken == 'NOT') {
      dispatch({ type: 'RESTORE_TOKEN', token: null });
    } else {
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }
  };

  updater = (prevState: any, action: any) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  };
}

const authenticationService = new AuthenticationService();
export default authenticationService;
