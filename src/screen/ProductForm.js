import React, { useState } from 'react'
import {View, StyleSheet, Text, Pressable,FlatList,TouchableOpacity, Image, ActivityIndicator, Dimensions, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductImageHandler from '../component/productImageHandler'
import {Switch, TextInput} from 'react-native-paper'
import {Picker} from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import * as productAction from '../../store/action/product'

const ProductForm = ({navigation, route}) => {

    const {item, type} = route.params
    const priceList = useSelector(x=>x.product.priceArray)
    const [productName, setProductName] = useState(type==='Edit'?item.name:'')
    const [description, setDescription] = useState(type==='Edit'?item.description:'')
    const [price, setPrice] = useState(type==='Edit'?item.price:'')
    const category  = useSelector(x=>x.category.categoryList)
    const [icon, setIcon] = useState(0)    
    const [ImageTaken, setImageTaken] = useState(type==='Edit'?item.image:null)
    const [wt, setWt] = useState('')
    const [offer, setOffer] = useState(false)
    const [offerPrice, setOfferPrice] = useState('')
    const dispatch = useDispatch()
    const onImageTaken = (imagePath) => { 
        setImageTaken(imagePath)
        console.log(imagePath)
    } 
    const [ShowPrice, setShowPrice] = useState(false)
    const [load, setLoad] = useState(false)

    const submitHandler = async() => {
        if(type === 'Edit'){
            await dispatch(productAction.editProduct(productName, description,   category[icon].id, category[icon].name, item.id))
            navigation.navigate('Home')    
        }else{
            setLoad(true)
        await dispatch(productAction.addProduct(productName, description, priceList,  ImageTaken, category[icon].id, category[icon].name))
        dispatch(productAction.clearPrice())
        navigation.navigate('Home')}
    }

    const submitPrice = async() => {
        if(offer === true && offerPrice === ''){
            alert('Wrong Input')
        }else{
        await dispatch(productAction.addPrice(price, wt,offer, offerPrice))
        setShowPrice(false)
        setOffer(false)
        console.log('done')}
    }

    if(load){

        <SafeAreaView style={{width:Dimensions.get("window").width, height:Dimensions.get("window").height}}>
            <ActivityIndicator
                color='green'
                size="large"
            />
        </SafeAreaView>

    }

    return(
        <SafeAreaView>
        <ScrollView>

            <ProductImageHandler
                onImageTaken={onImageTaken}
            />
            
            <Text style={{marginTop:12, alignSelf:'center', fontSize:20}}>Choose a category</Text>
            <FlatList
                data={category}
                style={{alignSelf:'center',}}
                keyExtractor={x=>x.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>{

                    return(
                        
                        <TouchableOpacity onPress={()=>{setIcon(index)
                        console.log(category[icon].name, icon)}} style={{margin:16}}>
                            <View style={{height:65, width:65, borderRadius:60, borderWidth:1, borderColor:icon === index?'#33a466':'#cccccc', alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                            <Image
                                style={{height:40, width:40, alignSelf:'center'}}
                                source={{uri:item.icon}}
                            />
                            </View>
                            <Text style={{fontFamily:'book',alignSelf:'center'}}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {productName}
                onChangeText={setProductName}
                label='Product Name'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {description}
                onChangeText={setDescription}
                label='Description'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            {priceList.map((item, index) =>{
                return<View style={{width:'92%', alignSelf:'center', marginVertical:4, backgroundColor:'white', borderRadius:8, padding:10}}>
                {!offer?<Text style={{alignSelf:'center', fontFamily:'book', fontSize:18}}>₹{item.price} for {item.wt}</Text>:
                <Text style={{alignSelf:'center', fontFamily:'book', fontSize:18}}>₹{item.offerPrice} for {item.wt}</Text>}
            </View>
            })}
            
            <Pressable onPress={()=>setShowPrice(!ShowPrice)}  style={{width:'90%', padding:12, backgroundColor:'white', borderRadius:6, alignSelf:'center',marginVertical:16, borderWidth:0.75, borderColor:'#fecc4c'}}>
                
            <Text style={{fontFamily:'book', fontSize:20, color:'#fecc4c', alignSelf:'center'}}>{!ShowPrice?"Add Price":"Close"}</Text>
                
            </Pressable>


            {ShowPrice && <View>
                <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                keyboardType='number-pad'
                value = {price}
                onChangeText={setPrice}
                label='Price'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {wt}
                onChangeText={setWt}
                label='weight/quantity'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            

            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', padding:16}}>
            <Text style={{fontFamily:'medium', fontSize:18}}>Offer ?</Text>
            <Switch
                value={offer}
                onValueChange={()=>setOffer(!offer)}
            />
            </View>
            </View>}
            {offer && <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                keyboardType='number-pad'
                value = {offerPrice}
                onChangeText={setOfferPrice}
                label='Price'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>}

            {ShowPrice && <Pressable style={{width:'90%', padding:12, backgroundColor:'#fecc4c', borderRadius:6, alignSelf:'center',marginVertical:16}} onPress={submitPrice}>
                
            <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>Add Price</Text>
                
            </Pressable>}

            <Pressable disabled={load} style={{width:'90%', padding:12, backgroundColor:'#fecc4c', borderRadius:6, alignSelf:'center',marginVertical:16}} onPress={load?null:submitHandler}>
                
                {<Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>Add Product</Text>}
                
            </Pressable>
            </ScrollView>
        </SafeAreaView>
    )

}

export default ProductForm