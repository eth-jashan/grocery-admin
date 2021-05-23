import React, {useCallback, useState} from 'react'
import {View, Text, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons ,Ionicons, AntDesign,Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as categoryAction from '../../store/action/category'
import * as productAction from '../../store/action/product'
import * as orderAction from '../../store/action/order'
import * as bannerAction from '../../store/action/banner'
import * as driveraction from '../../store/action/driver'
import { useFocusEffect } from '@react-navigation/native';

const {width, height} = Dimensions.get('screen')

const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    
    const newconfirmed = useSelector(x=>x.order.notConfirmed)
    const confirmed = useSelector(x=>x.order.confirmed)
    let process = useSelector(x=>x.order.process)
    const delivered = useSelector(x=>x.order.delivered)
    const assigned = useSelector(x=>x.order.assigned)
    const list = useSelector(x=>x.category.categoryList)
    const product = useSelector(x=>x.product.productList)
    const driver = useSelector(x=>x.driver.driverList)
    const banner = useSelector(x=>x.banner.list)
    


    useFocusEffect(
        useCallback(() => {
          const fetchUser = async () => {
            setLoad(true)
            await dispatch(categoryAction.categoryFetch())
            await dispatch(orderAction.fetchCancel())
            await dispatch(productAction.fetchProduct())
            await dispatch(orderAction.fetchOrder())
            await dispatch(orderAction.fetchProcessed())
            await dispatch(bannerAction.fetchBanner())
            await dispatch(bannerAction.fetchCatBanner())
            await dispatch(driveraction.driverFetch())
            setLoad(false)
                        
          };
          fetchUser();
          return () => {
            fetchUser()
          };
        }, [dispatch])
      );



      if(load){
          return<SafeAreaView style={{width:width, height:height}}>
            <ActivityIndicator
              animating={load}
              size='large'
              color='green'
            />
          </SafeAreaView>  
        }else{
    return(
        <SafeAreaView style={{width:width, height:height, flex:1}}>
        <ScrollView>

            <View style={{margin:16}}>
            <Text style={{fontFamily:'medium', fontSize:24}}>Admin Summary</Text>
            </View>
            
            <TouchableOpacity onPress={()=>navigation.navigate('BannerList')}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row' }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <MaterialIcons name="local-offer" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{banner.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Banner Added</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('CategoryList')}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row', marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <MaterialIcons name="category" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{list.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Categories Added</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('CatBannerList')}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row', marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <MaterialIcons name="local-offer" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{banner.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Category Banner Added</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('ProductList')}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row', marginTop:16}}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="ios-cart" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{product.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Products Added</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('DriverList')}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row', marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <MaterialCommunityIcons name="racing-helmet" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{driver.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Driver Added</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('OrderList',{ name:"Not Confirmed"})}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row',marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#ff0000', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <AntDesign name="loading1" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{newconfirmed.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Not Confirmed</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('OrderList',{ name:"Confirmed"})}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row',marginTop:16  }}>
            <View style={{width:50, height:50, backgroundColor:'orange', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <Feather name="package" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{confirmed.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Confirmed</Text>
            </View>
            </View>
            </TouchableOpacity>

            

            <TouchableOpacity onPress={()=>navigation.navigate('OrderList',{ name:"Out For Delivery"})}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row' ,marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#ffcb2c', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <MaterialIcons name="delivery-dining" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{assigned.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Delivery Assigned</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('OrderList',{ name:"Out For Delivery"})}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row' ,marginTop:16 }}>
            <View style={{width:50, height:50, backgroundColor:'#ffcb2c', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <MaterialIcons name="delivery-dining" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{process.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Out For Delivery</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('OrderList',{ name:"Delivered"})}>
            <View style={{width:'90%', backgroundColor:'white',padding:8,alignSelf:'center',borderRadius:5, flexDirection:'row',marginTop:16  }}>
            <View style={{width:50, height:50, backgroundColor:'#33a466', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="checkmark-done" size={30} color="white" />
            </View>
            <View style={{alignSelf:'center', marginLeft:24}}>
                <Text style={{fontFamily:'black', fontSize:28}}>{delivered.length}</Text>
                <Text style={{fontFamily:'book', fontSize:20}}>Delivered Order</Text>
            </View>
            </View>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    )}

}

export default HomeScreen