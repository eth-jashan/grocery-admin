import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as bannerAction from '../../store/action/banner'
import { AntDesign } from '@expo/vector-icons';

const BannerList = ({navigation}) => {

    const banner = useSelector(x=>x.banner.list)
    const dispatch = useDispatch()



    const deletehandler = async(id) => {
        await dispatch(bannerAction.deleteBanner(id))
        dispatch(bannerAction.fetchBanner())
    }
    

    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Banners</Text>

        <FlatList
            data={banner}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                console.log('Item', item)
                return(
                    <View style={{margin:8, alignSelf:'center'}}>
                    
                <View style={{width:Dimensions.get('screen').width, padding:8, borderRadius:10, height:(Dimensions.get('screen').width)/2}}>
                
                <Image
                    // resizeMethod='scale'
                    resizeMode='cover'
                    style={{width:'100%',height:"100%"}}
                    source={{uri:item.url}}
                />
                </View>               
        
        <Pressable onPress={()=>deletehandler(item.id)} style={{padding:8, backgroundColor:'#f40c43', borderRadius:8, width:"60%", alignSelf:'center',marginTop:4}}>
            <Text style={{fontFamily:'book', fontSize:16, color:'white', alignSelf:'center'}}>Delete</Text>
        </Pressable>
        </View>)
        
            }}
        />
        <Pressable
            
            style={{height:70, width:70, borderRadius:50, backgroundColor:'#fecc4c', position:'absolute',top:Dimensions.get('window').height*0.9,left:Dimensions.get("window").width*0.75 }}
            onPress={()=>navigation.navigate('BannerScreen',{item:[], type:'Create'})}
        />
        </SafeAreaView>
    )

}

export default BannerList