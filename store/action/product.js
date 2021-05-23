export const ADD_PRODUCT = "ADD_PRODUCT"
export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const ADD_PRICE = 'ADD_PRICE'
export const CLEAR_PRICE = 'CLEAR_PRICE'

import firebase from '../../firebase'
import ProductModel from '../../model/productModel'

export const addPrice = (price, wt, offer, offerPrice) => {

    return async (dispatch, getState) => {

        dispatch({type:ADD_PRICE, price, wt, offer, offerPrice })

    }

}

export const clearPrice = () => {

    return async ({dispatch}) =>{
        dispatch({type:CLEAR_PRICE})
    }

}

export const addProduct = (name, description, price,  imageUrl, catId, catName, ) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        console.log(uid)
        
        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product.json?`,{
            method:'POST',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                name, description, price, catId, catName, 
            })
        })
        console.log("image:", imageUrl)
        const resData = await response.json()
        const image = await fetch(imageUrl);
        const blob = await image.blob();
        const ref = firebase.storage().ref(`${'items/product/' + `${resData.name}`}`);
        await ref.put(blob);
        const url = await firebase.storage().ref(`${'items/product/' + `${resData.name}/`}`).getDownloadURL();
        
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product/${resData.name}.json?`,{
            method:'PATCH',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                image:url
            })
        })
        

        dispatch({type:ADD_PRODUCT, id:resData.name, name, description, price,  url, catId, catName,})

    }

}

export const fetchProduct = () => {

    return async (dispatch, getState)=>{

    const uid = getState().auth.userId
    const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product.json?`)
    const resData = await response.json()
    
    const itemList = []

    for(const keys in resData){

        itemList.push(new ProductModel(keys, resData[keys].name, resData[keys].price,  resData[keys].description, resData[keys].catName, resData[keys].catId, resData[keys].image))
    
    }

    console.log("Item", resData)

    dispatch({type:FETCH_PRODUCT, list:itemList})

    }

}

export const editProduct = (name, description,   catId, catName, id, ) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        console.log(uid)
        
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product/${id}.json?`,{
            method:'PATCH',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                name, description, price,   catId, catName,
            })
        })
        

    }

}

export const deleteproduct = (id) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        console.log("uid", id)
        
        // const uid = '1'
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/product/${id}.json?`,{
            method:'DELETE'})

    }

}