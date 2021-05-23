import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import * as offerHandler from '../../store/action/banner'
import OfferImage from '../component/offerImage'

const BannerScreen = ({navigation}) => {

    const [ImageTaken, setImageTaken] = useState()
    const [load, setLoad] = useState(false)
    const onImageTaken = (imagePath) => { 
        setImageTaken(imagePath)
        console.log(imagePath)
    }
    const dispatch = useDispatch()

    const bannerHandler = () => {
        console.log('press')
        setLoad(true)
        dispatch(offerHandler.addbanner(ImageTaken))
        setLoad(false)
        navigation.navigate('Home')
    }

    return(
        <SafeAreaView>
            <Text style={{alignSelf:'center', fontFamily:'medium', fontSize:20}}>Upload Offer Banner</Text>
            <OfferImage
                onImageTaken={onImageTaken}
            />

            <Pressable disabled={load} style={{width:'90%', padding:12, backgroundColor:'#fecc4c', borderRadius:6, alignSelf:'center',marginVertical:16}} onPress={load?null:bannerHandler}>
                
                <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>Add Banner</Text>
                
            </Pressable>
        </SafeAreaView>
    )

}

export default BannerScreen