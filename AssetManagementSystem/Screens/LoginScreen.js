import React, { Component } from "react";
import { Text, Image } from 'react-native';
import { Card, CardSection, Button, Header, Input } from '../src/components/common';
import StackNavigator from 'react-navigation';
import FacilityScreen from './FacilityScreen';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class LoginScreen extends Component {
    static navigationOptions={
      title: 'Please Login',
      headerLeft: null,
      gesturesEnabled: false
    }
    
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        username: 'Toor', 
        password: 'password'
      };
    };

    validateUser() {
      if((this.state.password).trim() == ''){
        this.setState({error: 'Password cannot be empty'})
        return false;
      } else if((this.state.username).trim() == ''){
        this.setState({error: 'Username cannot be empty'})
        return false;
      }
      axios.get('https://d9wswrhvk3.execute-api.us-east-1.amazonaws.com/latest/authenticate?USERNAME='
          +this.state.username+'&PASSWORD='+this.state.password)
            .then(recordset => {
              try{
              if(recordset.data.recordset[0].Exists == 1){
                this.props.navigation.navigate('FacilityScreen', {
                  Id: recordset.data.recordset[0].Id,
                  UserName: this.state.username,
                  IsAdmin: recordset.data.recordset[0].IsAdmin,
                });
              } 
            }catch(err){
              this.setState({error: 'Authentication Failed.'});
          }
      });
    }
    
    render() {
      var { navigate } = this.props.navigation;
      return (
        <KeyboardAwareScrollView>
          <Card>
            <Header headerText={'Asset Management System'}/>
            <Image style={ styles.thumbnailStyle } source={{uri: 'http://www.wendia.com/wp-content/uploads/2015/07/purchase-guy.png'}} />
            <CardSection>
              <Input
                label = {'Username'}
                placeholder = "Enter your Username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
            </CardSection>
            <CardSection>
              <Input  
              label = {'Password'}
              secureTextEntry = { true }
              placeholder = "Enter your Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
            </CardSection>
            <Text style= {styles.errorStyle}>
              { this.state.error }
            </Text>
            <CardSection>
              <Button onPress={() => this.validateUser()} buttonText={'Login'} />
            </CardSection>
          </Card> 
        </KeyboardAwareScrollView>
      );
    }
  }
const styles = {
  errorStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
  thumbnailStyle: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  }
}
export default LoginScreen;