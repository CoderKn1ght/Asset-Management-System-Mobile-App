import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import LoginScreen from "./LoginScreen";
import FacilityList from "../src/components/FacilityList";
import { Header } from "../src/components/common";

var user;
class FacilityScreen extends Component {
    
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return{
            title: 'Facilities',
            headerLeft: null,
            gesturesEnabled: false,
            headerRight: <Button onPress={() => navigation.navigate('LoginScreen')} title="Logout" />
        }
        
      }
    
    render() {
        const { params } = this.props.navigation.state;
        const Id = params ? params.Id : null;
        const UserName = params ? params.UserName : null;
        const IsAdmin = params ? params.IsAdmin : null;
        return (
            <View style={styles.viewStyle}>
                <Header headerText={ 'Welcome ' + UserName }/>
                <FacilityList navigation={this.props.navigation} Id={ Id } IsAdmin={IsAdmin}/>
            </View>
        );
    }
  }

  const styles = {
      viewStyle: { 
        flex: 1,
        padding: 20
      }
  }


export default FacilityScreen;