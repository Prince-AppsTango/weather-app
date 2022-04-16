import { View, Text,TextInput ,StyleSheet,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from 'react-query';
import axios from 'axios';
export default function SearchScreen({navigation,route}) {
    const[textData,setTextData]=useState("")
    const[focus,setFocus]=useState(true)
    const {cityName,temp}=route.params;
    const query = useQuery(
        "users",
        () => axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${textData},IN&APPID=8f1a340c3e454ee4d4f86a6a91944d8d`),
        {
        }
      );
      console.log(JSON.stringify(query?.data?.data,null,4))
      console.log(textData)
  return (
    <View style={{margin:20}}>
    <View style={{flexDirection:'row',borderWidth:1,borderRadius:20,borderColor:'grey'}}>  
      <TextInput style={{padding:10}} placeholder="Search" value={textData} onChangeText={(e)=>setTextData(e)} onPressIn={()=>setFocus(false)} />
      <TouchableOpacity onPress={()=>{query.refetch(),setFocus(true)}} style={{position:'absolute',right:10,marginTop:5}}>
      <Ionicons name="search-outline" color="black" size={25} />
      </TouchableOpacity>
    </View>
     {focus &&<View style={{flexDirection:'row',justifyContent:'space-between',margin:15,padding:20,borderRadius:15,backgroundColor:'#778899'}}>
       <View style={{flexDirection:'row'}}> 
           <Text style={{fontSize:20,fontWeight:'800',color:'white'}}>{query?.data?.data?.name}</Text>
           <Ionicons name="ios-location-outline" color="white" size={21} />
       </View> 
         <Text style={{fontSize:20,fontWeight:'800',color:'white'}}>{(query?.data?.data?.main?.temp -273.15).toFixed(0)}℃</Text>
     </View>}
    </View>
  )
}

const styles =StyleSheet.create({
    
})