import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

//import Home from './screens/Home';
//import CurrencyList from './screens/CurrencyList';
//import Options from './screens/Options';
import Navigator from './config/routes';
import {AlertProvider} from './components/Alert';
import {Provider } from 'react-redux';
import store from './config/store';



EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen:'#00BD9D',
  $primaryPurple:'#9E768F',
  $white:'#FFFFFF',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',

  
});

export default () => (
<Provider store={store  } >
<AlertProvider>
  <Navigator onNavigationStateChange= {null} />
</AlertProvider>
</Provider> 
);
//export default () => <Home />;