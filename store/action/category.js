export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FETCH_CATEGORY = 'FETCH_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
import firebase from '../../firebase'

import CategoryModel from '../../model/categoryModel'

export const editcategory = (id, categoryName, categoryDescription) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        console.log("uid", uid)
        
        // const uid = '1'
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/category/${id}.json?`,{
            method:'PATCH',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                name:categoryName,
                description:categoryDescription,
            })
        })

    }

}

export const deletecategory = (id) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        console.log("uid", id)
        
        // const uid = '1'
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/category/${id}.json?`,{
            method:'DELETE'})

    }

}

export const addcategory = (categoryName, categoryDescription, imageUrl) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid
        console.log("uid", uid)
        
        // const uid = '1'
        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/category.json?`,{
            method:'POST',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                name:categoryName,
                description:categoryDescription
            })
        })
        const resData = await response.json()
        console.log("image:", imageUrl)
        const image = await fetch(imageUrl);
        const blob = await image.blob();
        const ref = firebase.storage().ref(`${'items/category/' + `${resData.name}`}`);
        await ref.put(blob);
        const url = await firebase.storage().ref(`${'items/category/' + `${resData.name}/`}`).getDownloadURL();
        
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/category/${resData.name}.json?`,{
            method:'PATCH',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({
                icon:url
            })
        })
        console.log("response", resData)

        dispatch({type:ADD_CATEGORY, id:resData.name, name:categoryName, description:categoryDescription, icon:url})

    }

}

export const categoryFetch = () => {
    return async (dispatch, getState)=>{
    
    const uid = getState().auth.uid
    const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/category.json?`)
    const resData = await response.json()
    
    const categoryList = []

    for(const keys in resData){
    categoryList.push(new CategoryModel(keys, resData[keys].name, resData[keys].description, resData[keys].icon))
    }
    
    console.log("response", categoryList)

    dispatch({type:FETCH_CATEGORY, list:categoryList})

}}