import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      password: '',
      isLoading: false,
    }
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyA6CmWLJMnCIrBnNGO_JxkYGwQKZTqIprs",
      authDomain: "series-539eb.firebaseapp.com",
      databaseURL: "https://series-539eb.firebaseio.com",
      projectId: "series-539eb",
      storageBucket: "series-539eb.appspot.com",
      messagingSenderId: "78887860483",
      appId: "1:78887860483:web:9daa98072dfe83a3255136",
      measurementId: "G-G76PPJPD8D"
    };
    // Initialize Firebase
    if ( ! firebase . apps . length ) {
      firebase.initializeApp(firebaseConfig);
    } 

  }

  onChangeHandler(field, value) {
    this.setState({
      [field]: value
    });
  }

  tryLogin() {
    this.setState({ isLoading: true })
    const { mail, password } = this.state;
    
    firebase
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .then(user => {
        console.log('Usuário autenticado!', user);
      })
      .catch(error => {
        console.log('Usuário NÃO encontrado', error);
      })
      .then(() => this.setState({ isLoading: false }));
  }

  renderButton() {
    if(this.state.isLoading)
      return <ActivityIndicator />

    return(  
      <Button 
        title="Entrar" 
        onPress={() => this.tryLogin()}
      />);
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first>
            <TextInput 
              style={styles.input}
              placeholder="usuario@email.com"
              value={this.state.mail}
              onChangeText={value => this.onChangeHandler('mail', value)}
            /> 
        </FormRow>
        
        <FormRow last>
            <TextInput 
              style={styles.input}
              placeholder="******" 
              secureTextEntry      
              value={this.state.password}   
              onChangeText={value => this.onChangeHandler('password', value)}
            /> 
        </FormRow>
        
        { this.renderButton() }
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  }
});