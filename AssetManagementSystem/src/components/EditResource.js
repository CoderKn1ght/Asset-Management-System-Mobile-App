import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Form = t.form.Form;

const Resource = t.struct({
  ResourceName: t.String,
  Description: t.maybe(t.String),
  Quantity: t.Number,
  Size: t.maybe(t.String),
  Color: t.maybe(t.String),
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    ResourceName: {
      editable: false,
      label: 'Name'
    },
    Quantity: {
      error: 'Quantity is Required.',
    },
  },
  stylesheet: formStyles,
};

export default class EditResource extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return{
        title: 'Edit Resource',
        gesturesEnabled: false,
        headerRight: <Button onPress={() => navigation.navigate('LoginScreen')} title="Logout" />
    }
    
  }  
  handleSubmit(Id, FacilityId) {
    const value = this._form.getValue();
    if(value){
        description = value['Description'] ? value['Description'] : '';
        size = value['Size'] ? value['Size'] : '';
        color = value['Color'] ? value['Color'] : '';
        axios.put('https://d9wswrhvk3.execute-api.us-east-1.amazonaws.com/latest/editResources',{
        "id": Id,
        "Description": description,
        "Quantity": value['Quantity'],
        "Size": size,
        "Color": color
        })
        .then(() => {
            alert("Resource Details Saved.")
            this.props.navigation.navigate('ResourceList', { FacilityId: FacilityId});
        });
    }
    
    }
  
  render() {
    const { params } = this.props.navigation.state;
    const Id = params.ResourceId.Id;
    const FacilityId = params.FacilityId.FacilityId;
    var values = {
        ResourceName: params.ResourceName.ResourceName, 
        Description: params.Description.Description,
        Quantity: params.Quantity.Quantity,
        Size: params.Size.Size,
        Color: params.Color.Color
    };
    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>
            <Form 
            ref={c => this._form = c}
            type={Resource} 
            options={options}
            value={ values }
            />
            <Button
            title="Save"
            onPress={() => this.handleSubmit(Id, FacilityId)}
            />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});