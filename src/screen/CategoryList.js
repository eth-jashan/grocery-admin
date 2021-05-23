import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryaction from '../../store/action/category'

const CategoryList = ({navigation}) => {

    const list = useSelector(x=>x.category.categoryList)
    const deletehandler= async(id)=>{
        await dispatch(categoryaction.deletecategory(id))
    }

    console.log("list", list)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(categoryaction.categoryFetch())
    },[])

    return(
        <SafeAreaView style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}>
        <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Categories</Text>

        <FlatList
            data={list}
            keyExtractor={x=>x.id}
            renderItem={({item}) => {
                return<View style={{marginVertical:12}}>
                <TouchableOpacity onPress={()=>navigation.navigate('CategoryForm',{item:item, type:"Edit"})}>
                <View style={{padding:16,width:Dimensions.get('window').width*0.85, borderRadius:8, height:Dimensions.get('window').height/6, borderWidth:1, borderColor:"#cccccc", alignSelf:'center', }}>
                    <Image
                        source={{uri:item.icon}}
                        style={[StyleSheet.absoluteFillObject]}
                    />
                    <Text style={{fontFamily:'book', fontSize:22,top:'70%'}}>{item.name}</Text>
                    <Text numberOfLines={1} style={{fontFamily:'book', fontSize:18,top:'70%'}}>{item.description}</Text>
                </View>
                </TouchableOpacity>
                <Pressable onPress={()=>deletehandler(item.id)} style={{padding:8, backgroundColor:'#f40c43', borderRadius:8, width:"60%", alignSelf:'center',marginTop:4}}>
                    <Text style={{fontFamily:'book', fontSize:16, color:'white', alignSelf:'center'}}>Delete</Text>
                </Pressable>
                </View>
            }}
        />
        <Pressable
            style={{height:70, width:70, borderRadius:50, backgroundColor:'#fecc4c', position:'absolute',top:Dimensions.get('window').height*0.9,left:Dimensions.get("window").width*0.75 }}
            onPress={()=>navigation.navigate('CategoryForm',{item:[], type:'Create'})}
        />
        </SafeAreaView>
    )

}

export default CategoryList