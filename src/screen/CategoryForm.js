import React, { useState } from 'react'
import { View, Dimensions,Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import {  TextInput, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
// import ImageHandler from '../component/imageHandler';
import * as categoryAction from '../../store/action/category'
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductImageHandler from '../component/productImageHandler';




const CategoryForm = ({navigation, route}) => {
    const {item, type} = route.params

    const dispatch = useDispatch()
    const [categoryName, setCategoryName] = useState(type === 'Edit'?item.name:'')
    const [categoryDescription, setCategoryDescription] = useState(type === 'Edit'?item.description:'')
    

    const data = ['https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F001-alcohol.png?alt=media&token=96b01795-ccd2-4c2f-9760-82a2c403e219',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F002-baby%20products.png?alt=media&token=52a103c2-8fe9-4772-b210-3346678156dc',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F003-sweets.png?alt=media&token=46de533f-fde3-4fad-9525-ca679f34b2ef',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F007-bread.png?alt=media&token=2f35e9ad-bd27-45d3-86a0-a7ee644391db',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F008-Butter.png?alt=media&token=c18560ae-ba7c-4b79-8823-4a2c97b1fba1',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F009-canned%20food.png?alt=media&token=6a1a12b9-ab78-4153-afe8-215fbe2fd990',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F015-cereal.png?alt=media&token=0c53c820-7c5c-40c3-85dd-f1e140cb659e',
'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2F016-cheeses.png?alt=media&token=c7729bc3-9bc7-4b1c-97e2-a464c8755a39']

    const imageTaken = (uri) => {
        setCategoryImage(uri)
    }

    const categoryHandler = async() => {
        if(type === 'Edit'){

            await dispatch(categoryAction.editcategory(item.id,categoryName, categoryDescription))
            navigation.navigate('Home')

        }else{
        await dispatch(categoryAction.addcategory(categoryName, categoryDescription,ImageTaken))
        navigation.navigate('CategoryList')}
    }  

   
    const onImageTaken = (imagePath) => { 
        setImageTaken(imagePath)
        console.log(imagePath)
    }
    const [ImageTaken, setImageTaken] = useState()
    return(
        <SafeAreaView style={{width:Dimensions.get("window").width}}>
            <Text style={{alignSelf:'center', fontFamily:'medium', fontSize:20}}>Choose an image for category</Text>
            
            <ProductImageHandler
                onImageTaken={onImageTaken}
            />

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {categoryName}
                onChangeText={setCategoryName}
                label='Name'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {categoryDescription}
                onChangeText={setCategoryDescription}
                label='Description'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            <Button onPress={categoryHandler}  mode='contained' style={{backgroundColor:'#33a466', width:'90%', alignSelf:'center', margin:12,padding:6, borderRadius:8}}>
            <Text style={styles.buttonStyle}>Add Category</Text>
            </Button>

        
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    heading:{
        fontFamily:'medium',
        fontSize:30,
        color:'black',  
    },
    heading2:{
        fontFamily:'medium',
        fontSize:20,
        color:'gray',  
    },
    buttonStyle:{
        fontFamily:'book', 
        fontSize:18
    }
})

export default CategoryForm