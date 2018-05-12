import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import ResourceDetail from './ResourceDetail';

export default class ResourceList extends Component {
    state = {resources: [], showLoader: true};
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return{
            title: 'Resources',
            gesturesEnabled: false,
            headerRight: <Button onPress={() => navigation.navigate('LoginScreen')} title="Logout" />
        }
        
      }
    componentWillMount(){
        this.loadInterval = setInterval(()=>{ this.setState({ showLoader: false })}, 1000);
        axios.get('https://d9wswrhvk3.execute-api.us-east-1.amazonaws.com/latest/getResources?id='+this.props.navigation.state.params.FacilityId)
             .then(recordset => this.setState({resources: recordset.data.recordset}));
    }
    componentWillUnmount () {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }
    getResources() {
        if (!Array.isArray(this.state.resources) || !this.state.resources.length) {
            return <Text style= {styles.textStyle}>No Resources Assigned.</Text>
        }
        return this.state.resources.map(resource => 
            <ResourceDetail key={resource.Id} FacilityId = {this.props.navigation.state.params.FacilityId} resource={ resource } navigation={this.props.navigation}/>
        );
    }

    render(){
        return(
           this.state.showLoader ?
                <View style ={styles.activityStyle}>
                    <ActivityIndicator size="large" color="#0000FF" style={styles.activityStyle}/>
                </View>
            :
            <ScrollView>
                {this.getResources()}
            </ScrollView>
        );
    }
}

const styles = {
    activityStyle:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    textStyle:{
        fontSize: 30,
        color: 'red',
        alignSelf: 'center',
        marginTop: 50,
    }

}