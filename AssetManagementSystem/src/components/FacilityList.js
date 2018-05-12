import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import FacilityDetail from './FacilityDetail';

export default class FacilityList extends Component {
    state = { facilities: [], showLoader: true };
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.loadInterval = setInterval(()=>{ this.setState({ showLoader: false })}, 1000);
        var IsAdmin = this.props.IsAdmin;
        if(IsAdmin == true){
            IsAdmin = 1;
        } else {
            IsAdmin = 0;
        }
        axios.get('https://d9wswrhvk3.execute-api.us-east-1.amazonaws.com/latest/getFacilities?id='+this.props.Id+'&IsAdmin='+IsAdmin)
             .then(recordset => {
                this.setState({facilities: recordset.data.recordset})  
        })
    }
    componentWillUnmount () {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }

    getFacilities() {
        if (!Array.isArray(this.state.facilities) || !this.state.facilities.length) {
            return <Text style= {styles.textStyle}>No Facilities Assigned.</Text>
        }
        else{
            return this.state.facilities.map(facility => 
                <FacilityDetail key={facility.Id} facility={ facility } navigation={this.props.navigation}/>
            );
        }
        
    }

    render() {
        return (
            this.state.showLoader ?
                <View style ={styles.activityStyle}>
                    <ActivityIndicator size="large" color="#0000FF" style={styles.activityStyle}/>
                </View>
            :
            <ScrollView>
                {this.getFacilities()}
            </ScrollView>
        );
    }
};

const styles = {
    activityStyle:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    textStyle:{
        fontSize: 18,
        justifyContent:'center'
    }

}

