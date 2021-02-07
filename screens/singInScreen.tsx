import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AuthContext from '../context';
import { Result } from '../interface/firebase';

export default class SignInScreen extends React.Component<
  {},
  { email: string; password: string; signInDisabled: boolean }
> {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signInDisabled: false,
    };
  }

  onSubmit = async () => {
    // Run the validation
    this.setState({ signInDisabled: true });
    if (!this.state.email || !this.state.password) {
      alert('Eneter password or email');
    } else {
      let user = {
        email: this.state.email,
        password: this.state.password,
      };
      let result: Result = await this.context.signIn(user);
      if (!result.flag) {
        alert(result.error);
        this.setState({ signInDisabled: false });
      }
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Text>Sign in </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          title="Sign in"
          disabled={this.state.signInDisabled}
          onPress={() => this.onSubmit()}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
