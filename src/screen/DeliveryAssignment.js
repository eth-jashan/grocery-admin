import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as driveraction from '../../store/action/driver'
import * as orderAction from '../../store/action/order'

const DeliveryAssignment = ({navigation, route}) => {

    const list = useSelector(x=>x.driver.driverList)
    const {id} = route.params
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(driveraction.driverFetch())
    },[])

    console.log('driver', list)

    const assignmentHandler = async( name, number, did) => {
        await dispatch(orderAction.deliverAssignment(id, name, number, did, 'Delivery Assigned'))
        await dispatch(orderAction.fetchProcessed())
        navigation.navigate('Home')
    }
    
    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Drivers Available</Text>

        <FlatList
            data={list}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return<TouchableOpacity onPress={()=>assignmentHandler(item.name, item.phonenumber, item.empId)}>
                <View style={{padding:16,width:Dimensions.get('window').width*0.85, borderRadius:8,  borderWidth:1, borderColor:"#cccccc", alignSelf:'center', marginVertical:12}}>
                    <Text style={{fontFamily:'book', fontSize:22}}>{item.name}</Text>
                    <Text numberOfLines={1} style={{fontFamily:'book', fontSize:18}}>{item.phonenumber}</Text>
                </View>
                </TouchableOpacity>
            }}
        />
        
        </SafeAreaView>
    )

}

export default DeliveryAssignment