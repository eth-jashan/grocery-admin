import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as driveraction from '../../store/action/driver'


const DriverList = ({navigation}) => {

    const list = useSelector(x=>x.driver.driverList)
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(driveraction.driverFetch())
    },[])
    console.log('driver', list)
    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Drivers</Text>

        <FlatList
            data={list}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return(
                    <TouchableOpacity onPress={()=>navigation.navigate('Cancel',{item:item})}>
                <View style={{padding:16,width:Dimensions.get('window').width*0.85, borderRadius:8,  borderWidth:1, borderColor:"#cccccc", alignSelf:'center', marginVertical:12}}>
                <Text style={{fontFamily:'book', fontSize:22}}>{item.name}</Text>
                <Text numberOfLines={1} style={{fontFamily:'book', fontSize:18}}>{item.phonenumber}</Text>
                </View>
                </TouchableOpacity>
                )
            }}
        />
        <Pressable
            style={{height:70, width:70, borderRadius:50, backgroundColor:'#fecc4c', position:'absolute',top:Dimensions.get('window').height*0.9,left:Dimensions.get("window").width*0.75 }}
            onPress={()=>navigation.navigate('DriverForm')}
        />
        </SafeAreaView>
    )

}

export default DriverList