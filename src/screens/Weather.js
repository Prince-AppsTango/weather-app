import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
  Linking,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useQuery} from 'react-query';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export default function Weather({navigation}) {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const[latitude,setLatitude]=useState('')
  const[longitude,setLongitude]=useState('')
  const onRefresh = React.useCallback(() => {
    query.refetch();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  // Geolocation.getCurrentPosition(info => {
  //   const lan = info;
  //   setLatitude(info?.coords?.latitude)
  //   setLongitude(info?.coords?.longitude)
  //   console.log(lan)
  // });
 
  //========================
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: query?.data?.data?.name,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //========================
  const image = {
    uri: 'https://images.unsplash.com/photo-1619453986741-43fe6066a86e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1527&q=80',
  };
  const query = useQuery(
    'users',
    () =>
      axios.get(
        'http://api.openweathermap.org/data/2.5/weather?q=Barrackpore,IN&APPID=8f1a340c3e454ee4d4f86a6a91944d8d',
      ),
    {},
  );
  // const city = useQuery(
  //   'city',
  //   () =>
  //     axios.get(
  //       `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=8f1a340c3e454ee4d4f86a6a91944d8d`,
  //     ),
  //   {},
  // );
  console.log(">>>>>>>>>>>>>>>>>",JSON.stringify(query?.data?.data, null, 4));
  function convertTime(unixTime) {
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = '0' + dt.getMinutes();
    let t = h + ':' + m.substr(-2);
    return t;
  }
  if (query.isLoading == true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              margin: 10,
              marginTop: 50,
              marginLeft: 15,
              marginRight: 15,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('SearchScreen', {
                  cityName: query?.data?.data?.name,
                  temp: (query?.data?.data?.main?.temp - 273.15).toFixed(0),
                })
              }>
              <AntDesign name="plus" size={17} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>
              {query?.data?.data?.name}
            </Text>

            <Menu
              visible={visible}
              anchor={
                <Entypo
                  onPress={showMenu}
                  name="dots-three-vertical"
                  color="white"
                  size={15}
                />
              }
              onRequestClose={hideMenu}>
              {/* <MenuItem onPress={hideMenu}>Menu item 1</MenuItem> */}
              <MenuItem onPress={onShare}>Share</MenuItem>
              <MenuItem onPress={Linking.openSettings}>Settings</MenuItem>
            </Menu>
          </View>
          <ScrollView
          showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View>
              <FontAwesome5 name="cloud-sun-rain" color="white" size={100} style={{textAlign:'center',marginTop:25}}/>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 50,
                  fontSize: 80,
                  color: 'white',
                }}>
                {(query?.data?.data?.main?.temp - 273.15).toFixed(0)}℃
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                {query?.data?.data?.weather.map(e => {
                  return (
                    <>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: 'white',
                        }}>
                        {e.main}{' '}
                      </Text>
                      <Image
                        source={{
                          uri: `http://openweathermap.org/img/w/${e.icon}.png`,
                        }}
                        style={{width: 30, height: undefined, aspectRatio: 1}}
                      />
                    </>
                  );
                })}
              </View>
            </View>
            <View style={{margin: 50}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 0.5,
                  padding: 10,
                  borderColor: 'grey',
                  borderRadius: 10,
                  backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                    Sunrise
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      margin: 6,
                      color: 'white',
                    }}>
                    {convertTime(query?.data?.data?.sys?.sunrise)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                    Sunset
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      margin: 6,
                      color: 'white',
                    }}>
                    {convertTime(query?.data?.data?.sys?.sunset)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  padding: 10,
                  borderColor: 'grey',
                  borderRadius: 10,
                  marginTop: 20,
                  backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                      Real feel
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        margin: 6,
                        color: 'white',
                      }}>
                      {(query?.data?.data?.main?.feels_like - 273.15).toFixed(
                        0,
                      )}
                      ℃
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                      Humidity
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        margin: 6,
                        color: 'white',
                      }}>
                      {query?.data?.data?.main?.humidity}%
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <View>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                      Wind Speed
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        margin: 6,
                        color: 'white',
                      }}>
                      {query?.data?.data?.wind?.speed} km/h
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                      Pressure
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        margin: 6,
                        marginLeft: 2,
                        color: 'white',
                      }}>
                      {query?.data?.data?.main?.pressure}mbar
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
