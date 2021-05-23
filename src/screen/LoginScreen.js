import React, { useRef, useState } from 'react'
import {View, StyleSheet, Text, Dimensions, Pressable, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  TextInput } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as authAction from '../../store/action/auth'
const {width, height} = Dimensions.get('screen')



const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    

    const signinHandler = async() => {
        try{
        await dispatch(authAction.loginUser('test.admin@gmail.com', 'password'))
        navigation.navigate('Main')
    }catch(err){
        alert(err)
    }
    }

    return(
        <SafeAreaView style={{height:height, width:width}}>
        
            <Image
                style = {[StyleSheet.absoluteFillObject]}
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/grocery-app-6bdd0.appspot.com/o/category-icons%2Fkevin-turcios-HXCzlNYs998-unsplash.jpg?alt=media&token=d396d471-9a13-49cc-bc4c-b5b264d3e659'}}
            />

            <View style={{width:width,marginTop:height/5, left:16 }}>
                <Text style={styles.heading}>Welcome to Grophy</Text>
                <Text style={styles.heading2}>Simplify your grocery needs.</Text>
            </View>
           <View style={{width:'92%', alignSelf:'center',marginVertical:12, justifyContent:'center'}}>
            <TextInput
                value = {email}
                onChangeText={(text)=>setEmail(text)}
                label="Email"
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center',marginVertical:12, justifyContent:'center'}}>
            <TextInput
                value = {password}
                onChangeText={(text)=>setpassword(text)}
                label="Password"
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            <Pressable style={{width:'90%', padding:12, backgroundColor:'#fecc4c', borderRadius:6, alignSelf:'center',marginVertical:16}} onPress={signinHandler}>
                
                <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>Login</Text>
                
            </Pressable>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    heading:{
        fontFamily:'medium',
        fontSize:28,
        color:'#33a466',  
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

export default LoginScreen