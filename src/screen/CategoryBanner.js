import React, { useState } from 'react'
import { View, Text, Pressable, FlatList , TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import * as offerHandler from '../../store/action/banner'
import OfferImage from '../component/offerImage'



const CategoryBanner = ({navigation}) => {

    const [ImageTaken, setImageTaken] = useState()
    const [load, setLoad] = useState(false)
    const [icon, setIcon] = useState(0)

    const onImageTaken = (imagePath) => { 
        setImageTaken(imagePath)
        console.log(imagePath)
    }

    const dispatch = useDispatch()
    const category  = useSelector(x=>x.category.categoryList)

    const bannerHandler = () => {
        console.log()
        setLoad(true)
        dispatch(offerHandler.addCatBanner(category[icon].name,category[icon].id,ImageTaken))
        setLoad(false)
        navigation.navigate('Home')
    }

    return(
        <SafeAreaView>
            <Text style={{alignSelf:'center', fontFamily:'medium', fontSize:20}}>Upload Offer Banner</Text>
            <OfferImage
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

            <Pressable disabled={load} style={{width:'90%', padding:12, backgroundColor:'#fecc4c', borderRadius:6, alignSelf:'center',marginVertical:16}} onPress={load?null:bannerHandler}>
                
                <Text style={{fontFamily:'book', fontSize:20, color:'white', alignSelf:'center'}}>Add Banner</Text>
                
            </Pressable>
        </SafeAreaView>
    )

}

export default CategoryBanner