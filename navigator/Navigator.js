import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../src/screen/LoginScreen';
import React,{useState} from 'react';
import HomeScreen from '../src/screen/HomeScrenn';
import CategoryForm from '../src/screen/CategoryForm';
import CategoryList from '../src/screen/CategoryList';
import ProductForm from '../src/screen/ProductForm';
import ProductList from '../src/screen/ProductList';
import OrderList from '../src/screen/OrderList';
import DriverForm from '../src/screen/DriverForm';
import DriverList from '../src/screen/DriverList';
import DeliveryAssignment from '../src/screen/DeliveryAssignment'
import BannerScreen from '../src/screen/BannerScreen';
import BannerList from '../src/screen/BannerList';
import CancelInfo from '../src/screen/CancelInfo';
import CategoryBanner from '../src/screen/CategoryBanner';
import CatBannerList from '../src/screen/CatBannerList';

const AuthStack = createStackNavigator()
const Auth = () => {
return(
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
        <AuthStack.Screen name='Login' component={LoginScreen} />
    </AuthStack.Navigator>
    )
}

const FlowStack = createStackNavigator()
const Flow = () => {
return(
    <FlowStack.Navigator screenOptions={{headerShown:false}}>
        <FlowStack.Screen name='Home' component={HomeScreen}/>
        <FlowStack.Screen name='CategoryForm' component={CategoryForm}/>
        <FlowStack.Screen name='CategoryList' component={CategoryList}/>
        <FlowStack.Screen name='ProductForm' component={ProductForm}/>
        <FlowStack.Screen name='ProductList' component={ProductList}/>
        <FlowStack.Screen name='OrderList' component={OrderList}/>
        <FlowStack.Screen name='DriverForm' component={DriverForm}/>
        <FlowStack.Screen name='DriverList' component={DriverList}/>
        <FlowStack.Screen name='DeliveryAssignment' component={DeliveryAssignment}/>
        <FlowStack.Screen name='BannerScreen' component={BannerScreen}/>
        <FlowStack.Screen name='BannerList' component={BannerList}/>
        <FlowStack.Screen name='Cancel' component={CancelInfo}/>
        <FlowStack.Screen name='CategoryBanner' component={CategoryBanner}/>
        <FlowStack.Screen name='CatBannerList' component={CatBannerList}/>
    </FlowStack.Navigator>
    )
}

const MainStack = createStackNavigator()
const AppNav = () => {
    return(
        <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown:false}}>
        <MainStack.Screen name='Login' component={Auth} />
        <MainStack.Screen name='Main' component={Flow} />
        </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNav