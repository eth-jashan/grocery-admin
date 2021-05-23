import React from 'react'
import {View, Text, Dimensions, Image, Pressable, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import * as orderAction from '../../store/action/order'

const OrderList = ({navigation, route}) => {

    const {name} = route.params
    const dispatch = useDispatch()
    
    const newconfirmed = useSelector(x=>x.order.notConfirmed)
    const confirmed = useSelector(x=>x.order.confirmed)
    let process = useSelector(x=>x.order.process)
    const delivered = useSelector(x=>x.order.delivered)

    let item
        if(name === 'Not Confirmed'){
            item = newconfirmed
        }else if(name === 'Confirmed'){
            item = confirmed
        }else if(name === 'Out For Delivery'){
            item = process
        }else if(name === 'Delivered'){
            item = delivered
        }

    

    const backgroundColor = (item) => {

        if(item.status === 'Not Confirmed'){
            return 'red'
        }else if(item.status === 'Confirmed'){
            return 'orange'
        }else if(item.status === 'Out For Delivery'){
            return 'orange'
        }else if(item.status === 'Delivered'){
            return 'green'
        }

    }

    const orderHandler = async(item) => {
        let status 

        if(item.status === 'Not Confirmed'){
            status = 'Confirmed'
            await dispatch(orderAction.orderStatus(item.id, status))
            await dispatch(orderAction.fetchOrder())
        }else{
            status = 'Delivery Assigned'
            navigation.navigate('DeliveryAssignment',{id:item.id})
        }      
        
    }

    

    return(
        <SafeAreaView>
            <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>{name}</Text>
            <FlatList
                style={{marginVertical:10}}
                data={item}
                keyExtractor={x=>x.id}
                renderItem={({item}) => {
                    let data = item.date.split('T')
                    return<View style={{width:Dimensions.get('window').width*0.9, padding:8, borderRadius:10 ,backgroundColor:'white', margin:16, alignSelf:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'light', fontSize:16, alignSelf:'center'}}>order id: {item.id}</Text>
                    <View style={{padding:8, borderWidth:1, borderColor:backgroundColor(item), borderRadius:4, alignItems:'center', width:100}}>
                        <Text style={{color:backgroundColor(item), alignSelf:'center', fontSize:10}}>{item.status}</Text>
                    </View>
                    </View>
                    <Text style={{fontFamily:'book', fontSize:18, marginVertical:4}}>{item.number}</Text>
                    <Text style={{fontFamily:'bold', fontSize:18, marginVertical:6, alignSelf:'center'}}>Address Details</Text>
                    <Text style={{fontFamily:'book', fontSize:16, marginTop:4}}>{item.address[0].room}</Text>
                    <Text style={{fontFamily:'book', fontSize:16, marginVertical:2}}>{item.address[0].society}</Text>
                    <Text style={{fontFamily:'book', fontSize:16, marginBottom:2}}>{item.address[0].landmark}</Text>
                    <Text style={{fontFamily:'book', fontSize:16, marginBottom:2}}>{item.address[0].pincode}, {item.address[0].city}</Text>
                    <Text style={{fontFamily:'bold', fontSize:18, marginVertical:6, alignSelf:'center'}}>Order Details</Text>
                    <FlatList
                        style={{marginBottom:16}}
                        data={item.order}
                        keyExtractor={x=>x.id}
                        renderItem={({item}) =>{
                            return<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                <View style={{width:'40%'}}>
                                <Text numberOfLines={1}>{item.name}</Text>
                                </View>
                                <Text>{item.quantity}</Text>
                                <Text>₹ {item.price}</Text>
                                </View>
                                }}
                            />
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontFamily:'book', fontSize:18, alignSelf:'center'}}> ₹{item.orderTotal}</Text>
                        <View style={{padding:8, borderWidth:1, borderColor:'red', borderRadius:4, alignItems:'center', width:100,alignSelf:'center'}}>
                        <Text style={{color:'red', alignSelf:'center', fontSize:10}}>{item.paymentMode}</Text>
                        </View>
                        </View>

                        <Pressable onPress={()=>orderHandler(item)} style={{padding:4, backgroundColor:'green', alignItems:'center',borderRadius:8, marginVertical:18 }}>
                            <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>Accept</Text>
                        </Pressable>
                       
                </View>
                }}
            />

        </SafeAreaView>
    )

}

export default OrderList