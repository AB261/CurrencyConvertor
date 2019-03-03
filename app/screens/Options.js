import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView,StatusBar, Platform, Linking} from 'react-native';
import {ListItem, Separator} from '../components/List';
import {Ionicons} from '@expo/vector-icons';
import { connectAlert } from "../components/Alert";


const ICON_SIZE = 23;
const ICON_COLOR = '#868686';
const ICON_PREFIX =  Platform.OS==='ios'? "ios" : "md";

class Options extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        alertWithType:PropTypes.func,
    }


    handleThemesPress = () => {
        console.log('press themes');
        this.props.navigation.navigate('Themes');
    }
    handleSitePress = () => {
        console.log('press site');
        Linking.openURL('https://www.moneycontrol.com/mccode/currencies/').catch( () => this.props.alertWithType('error','Sorry!','The website might be currently down'));
        
    }

    render() {
        return (
            <ScrollView>
                <StatusBar translucent= {false} barStyle = "default"  />
                <ListItem 
                    text="Themes" 
                    onPress={this.handleThemesPress}
                    customIcon = {
                                <Ionicons 
                                    size={ICON_SIZE} 
                                    name={`${ICON_PREFIX}-arrow-forward`}
                                    color = {ICON_COLOR}    
                                /> } 
                 />
                
                <Separator/>
                <ListItem 
                text="Fixer.io" 
                onPress={this.handleSitePress}
                customIcon = {
                    <Ionicons 
                        size={ICON_SIZE} 
                        name={`${ICON_PREFIX}-link`}
                        color = {ICON_COLOR}    
                    /> } 
                 />
            </ScrollView>
        );
    }

};

export default connectAlert(Options);