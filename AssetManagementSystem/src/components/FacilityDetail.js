import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button, DataView } from './common';
import ResourceList from '../components/ResourceList';

export default class FacilityDetail extends Component {
      constructor(props) {
        super(props);
    }
    render(){
        
        const { Id, Name, Description, Address} = this.props.facility;
        const { thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle } = styles; 
        return(
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ResourceList', { FacilityId: Id})}>
                <Card >
                    <CardSection>
                        <View style={ thumbnailContainerStyle }>
                        <Image style={ thumbnailStyle } source={{uri: 'http://www.hestiafacilities.com/FM-Images/icon-8.png'}} />
                        </View>
                        <View style={ headerContentStyle }>
                            <Text style={ headerTextStyle }>{ Name }</Text>
                        </View>    
                    </CardSection>
                    <CardSection>
                        <View>
                            <Text>Description : {Description}</Text>
                            <Text>Address : {Address} </Text>
                        </View>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        ); 
    }
};



const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
};
