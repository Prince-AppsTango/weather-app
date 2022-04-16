import { View, Text } from 'react-native'
import React from 'react'
import Weather from './src/screens/Weather'
import SearchScreen from './src/screens/SearchScreen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function SerachNavigation(){
  return(
<Stack.Navigator>
        <Stack.Screen name="Weather" component={Weather} options={{headerShown:false}}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerBackTitleVisible:false,title:'Mange Cities'}}/>
</Stack.Navigator>
  )

}


export default function App() {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      <SerachNavigation/>
      </QueryClientProvider>
      </NavigationContainer>
  )
}