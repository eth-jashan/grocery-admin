import React from 'react'
import {Dimensions, FlatList, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const CancelInfo = ({navigation, route}) => {

    const {item} = route.params
    const cancel = useSelector(x=>x.order.cancel)
    const list = cancel.filter(x=>x.uid === item.empId)
    console.log('Item: ', item)
    console.log('Cancel :', cancel.filter(x=>x.uid === item.empId))
    return(
        <SafeAreaView>
            <Text style={{fontFamily:'medium', alignSelf:'center', fontSize:28}}>Cancelled Order</Text>
            <FlatList
                style={{top:20}}
                data={list}
                keyExtractor={x=>x.id}
                renderItem={({item}) =>{
                    return<View style={{alignSelf:'center', margin:5, width:Dimensions.get('window').width*0.9, borderRadius:8, backgroundColor:'white', padding:10}}>
                        <View style={{width:'100%', flexDirection:'row'}}>
                        <Text style={{fontFamily:'medium', fontSize:20}}>id :</Text>
                        <Text style={{fontFamily:'light', fontSize:20, marginHorizontal:8}}>{item.orderId}</Text>
                        </View>
                        <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center'}}>{item.reason}</Text>
                    </View>
                }}
            />
        </SafeAreaView>
    )

}

export default CancelInfo