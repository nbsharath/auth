import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/homeScreen';
import SplashScreen from './screens/splashScreen';
import SignInScreen from './screens/singInScreen';
import AuthContext from './context';
import authenticationService from './services/authenticationService';

const Stack = createStackNavigator();
export default function App() {
  const [state, dispatch] = React.useReducer(authenticationService.updater, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  React.useEffect(() => {
    authenticationService.bootstrapAsync(dispatch);
  }, []);

  const authContext = React.useMemo(
    () => authenticationService.authentication(dispatch),
    []
  );
  return (
    <View>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) : (
              // User is signed in
              <Stack.Screen name="Home" component={HomeScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}
