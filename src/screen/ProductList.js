import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as productAction from '../../store/action/product'
import { AntDesign } from '@expo/vector-icons';

const ProductList = ({navigation}) => {

    const product = useSelector(x=>x.product.productList)
    const dispatch = useDispatch()

    const deletehandler = async(id) => {
        await dispatch(productAction.deleteproduct(id))
        dispatch(productAction.fetchProduct())
    }
    

    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Products</Text>

        <FlatList
            numColumns={2}
            data={product}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return(
                    <View style={{margin:8}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ProductForm',{item:item, type:"Edit"})}>
                <View style={{width:Dimensions.get('window').width*0.45, padding:8, borderRadius:10, backgroundColor:'white',}}>
                <Image
                    resizeMode='contain'
                    style={{width:'90%',height:200, borderTopLeftRadius:10, borderTopRightRadius:10}}
                    source={{uri:item.image}}
                />
            <View style={{marginTop:8}}>
                <Text numberOfLines={1} style={{fontFamily:'book', fontSize:18}}>{item.name}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{marginVertical:4}}>
                    <Text style={{fontFamily:'light' }}>{item.wt}</Text>
                    {/* <Text style={{fontFamily:'medium', fontSize:18}}>₹ {item.price}</Text> */}
                    </View>
                    {/* <AntDesign style={{alignSelf:'center'}} name="heart" size={20} color="red" /> */}
                </View>
            </View>
        </View>
        </TouchableOpacity>
        <Pressable onPress={()=>deletehandler(item.id)} style={{padding:8, backgroundColor:'#f40c43', borderRadius:8, width:"60%", alignSelf:'center',marginTop:4}}>
            <Text style={{fontFamily:'book', fontSize:16, color:'white', alignSelf:'center'}}>Delete</Text>
        </Pressable>
        </View>)
        
            }}
        />
        <Pressable
            
            style={{height:70, width:70, borderRadius:50, backgroundColor:'#fecc4c', position:'absolute',top:Dimensions.get('window').height*0.9,left:Dimensions.get("window").width*0.75 }}
            onPress={()=>navigation.navigate('ProductForm',{item:[], type:'Create'})}
        />
        </SafeAreaView>
    )

}

export default ProductList