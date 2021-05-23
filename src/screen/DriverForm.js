import React, { useState } from 'react'
import { View, Dimensions,Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import {  TextInput, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
// import ImageHandler from '../component/imageHandler';
import * as driverAction from '../../store/action/driver'
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';




const DriverForm = ({navigation}) => {

    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [number, setNumber] = useState()
    const [email, setEmail] = useState()
    const [pass1, setPass1] = useState()
    const [pass2 ,setPass2] = useState()

    const [load, setLoad] = useState(false)

    const driverHandler = async() => {

        if(pass1 === pass2){
        setLoad(true)
        await dispatch(driverAction.addDriver(name, number, email+'@mogambo.com', pass1))
        setLoad(false)
        navigation.navigate('DriverList')}else{
            alert('Password doesnot match')
        }
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
        <SafeAreaView style={{width:Dimensions.get("window").width}}>
            <Text style={{alignSelf:'center', fontFamily:'medium', fontSize:20}}>Enroll Driver</Text>
            
            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {name}
                onChangeText={setName}
                label='Name'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {number}
                onChangeText={setNumber}
                label='Number'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            
            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {email}
                onChangeText={setEmail}
                label='username'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {pass1}
                onChangeText={setPass1}
                label='Password'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>

            <View style={{width:'92%', alignSelf:'center', marginVertical:4}}>
            <TextInput
                value = {pass2}
                onChangeText={setPass2}
                label='Re-Password'
                mode = 'outlined'
                theme ={{colors:{primary:'#33a466',underlineColor:'transparent'}}}
            />
            </View>
            
            
            <Button onPress={driverHandler}  mode='contained' style={{backgroundColor:'#33a466', width:'90%', alignSelf:'center', margin:12,padding:6, borderRadius:8}}>
            <Text style={styles.buttonStyle}>Add Driver</Text>
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

export default DriverForm