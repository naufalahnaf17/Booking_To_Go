import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './redux/store';
import {Provider} from 'react-redux';

import PaymentDetails from './screen/PaymentDetails/payment-details';
import AddGuest from './screen/AddGuest/add-guest';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PaymentDetails"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
        <Stack.Screen name="AddGuest" component={AddGuest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
