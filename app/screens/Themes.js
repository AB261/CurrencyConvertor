import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, StatusBar
  } from 'react-native';
  
  import { ListItem, Separator } from '../components/List';
  import EStyleSheet from 'react-native-extended-stylesheet';
  import {changePrimaryColor} from '../actions/theme';
  import {connect} from 'react-redux';

  const styles = EStyleSheet.create({
      $blue:'$primaryBlue',
      $green:'$primaryGreen',
      $orange:'$primaryOrange',
      $purple:'$primaryPurple',

  });

class Themes extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
    }
    
    handleThemePress = (color) => {
        this.props.dispatch(changePrimaryColor(color));
        this.props.navigation.goBack();
    }
    render (){
        return (
            <ScrollView>
                <StatusBar translucent={false} barStyle= "default" />
                <ListItem
                text="Blue"
                onPress = {() => this.handleThemePress(styles.$blue)}
                checkmark = {false}
                visible = {true} 
                selected = {true}
                iconBackground = {styles.$blue} />
                <ListItem
                text="Green"
                onPress = {() => this.handleThemePress(styles.$green)}
                checkmark = {false}
                visible = {true}
                selected = {true}
                iconBackground = {styles.$green} />
                <ListItem
                text="Orange"
                onPress = {() => this.handleThemePress(styles.$orange)}
                checkmark = {false}
                visible = {true} 
                selected = {true}
                iconBackground = {styles.$orange}/>                
                <ListItem
                text="Purple"
                onPress = {() => this.handleThemePress(styles.$purple)}
                checkmark = {false}
                visible = {true} 
                selected = {true}
                iconBackground = {styles.$purple}/>
            </ScrollView>
        );
    }

}

export default connect()(Themes);