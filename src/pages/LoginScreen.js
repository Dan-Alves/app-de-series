import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
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
      message: ''
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
    this.setState({ isLoading: true, message: '' });
    const { mail, password } = this.state;
    
    const loginUserSucess = user => {
      this.setState({ message: 'Sucesso!' });
    }

    const loginUserFailed = error => {
      this.setState({
        message: this.getMessageByErrorCode(error.code)
      });
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .then(loginUserSucess)
      .catch(error => {
        if(error.code === 'auth/user-not-found') {
          return Alert.alert(
            'Usuário não encontrado', 
            'Deseja criar um cadastro com as informações inseridas?',
            [{
              text: 'Não',
              onPress: () => console.log('Usuário não quer criar conta'),
              style: 'cancel'
            }, {
              text: 'Sim',
              onPress: () => {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(mail, password)
                  .then(loginUserSucess)
                  .catch(loginUserFailed)
              }
            }],
            { cancelable: false }
          )
          return;
        } 
          loginUserFailed(error);
       
      })
      .then(() => this.setState({ isLoading: false }));
  }

  getMessageByErrorCode(errorCode) {
    switch(errorCode) {
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/user-not-found':
        return 'Usuário não encontrado';
      default:
        return 'Erro desconhecido';
    }
  }

  renderMessage() {
    const { message } = this.state;
    if(!message)
      return null;

    return (
      <View>
        <Text>{ message }</Text>
      </View>
    );
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
        { this.renderMessage()}
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