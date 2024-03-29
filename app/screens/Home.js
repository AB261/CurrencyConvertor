import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import {connectAlert} from '../components/Alert';

import { changeCurrencyAmount, swapCurrency, getInitialConversion } from '../actions/currencies';







class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch:PropTypes.func,
    baseCurrency:PropTypes.string,
    quoteCurrency:PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    LastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,

  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currencyError&& nextProps.currencyError!==this.props.currencyError) {
      this.props.alertWithType('error','Error',nextProps.currencyError);
    }
  }


  handleChangeText = (text) => {
    // TODO: Dispatch this action to redux
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handlePressBaseCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Base Currency',type:'base' },);
  };

  handlePressQuoteCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Quote Currency',type:'quote' });
  };

  handleSwapCurrency = () => {
    // TODO: Dispatch this action to redux
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Options');
  };

  render() {
    
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if(this.props.isFetching) {
      quotePrice = '...';
    }

    
    return (
      <Container backgroundColor = {this.props.primaryColor} >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor = {this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            textColor= {this.props.primaryColor}
          />
          <InputWithButton
            editable={false}
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            textColor= {this.props.primaryColor} 
          />
          <LastConverted
            date={this.props.LastConvertedDate}
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton onPress={this.handleSwapCurrency} text="Reverse Currencies" />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency =  state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency, 
    quoteCurrency,
    amount :state.currencies.amount,
    conversionRate: rates[quoteCurrency],
    isFetching:conversionSelector.isFetching,
    LastConvertedDate: conversionSelector.date? new Date(conversionSelector.date) : new Date(),
    primaryColor:state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};


export default connect(mapStateToProps)(connectAlert(Home));