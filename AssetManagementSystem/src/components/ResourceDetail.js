import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from './common';
import ResourceList from '../components/ResourceList';

export default class ResourceDetail extends Component {
    static navigationOptions={
        title: 'Resources'
      }
      constructor(props) {
        super(props);
    }
    render(){
        const FacilityId = this.props.FacilityId;
        const { Id, ResourceName, Description, Quantity, Size, Color  } = this.props.resource;
        const { thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle } = styles; 
        return(
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditResource', {
                ResourceId: {Id},
                ResourceName: { ResourceName },
                Description: { Description },
                Quantity: { Quantity },
                Size: { Size },
                Color: { Color },
                FacilityId: { FacilityId }
                })}>
                <Card>
                    <CardSection>
                        <View style={ thumbnailContainerStyle }>
                            <Image style={ thumbnailStyle } source={{uri: 'http://www.scadmissions.com/wp-content/uploads/2015/09/Human-Resources.png'}} />
                        </View>
                        <View style={ headerContentStyle }>
                            <Text style={ headerTextStyle }>{ ResourceName }</Text>
                            <Text>{ Description }</Text>
                        </View>    
                    </CardSection>
                    <CardSection>
                        <View>
                            <Text>Quantity: { Quantity }</Text>
                            <Text>Size: { Size }</Text>
                            <Text>Color: { Color }</Text>
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
    }
};
