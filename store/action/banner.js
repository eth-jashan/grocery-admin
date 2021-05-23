export const ADD_BANNER = 'ADD_BANNER'
export const REMOVE_BANNER = 'REMOVE_BANNER'
export const FETCH_BANNER = 'FETCH_BANNER'
export const ADD_CATBANNER = 'ADD_CATBANNER'
export const FETCH_CATBANNER = 'FETCH_CATBANNER'

import firebase from '../../firebase'
import BannerModel from '../../model/BannerModel'
import CatBanner from '../../model/CategoryBanner'


export const addbanner = (imageUrl) => {

    return async (dispatch, getState) => {

        const image = await fetch(imageUrl);
        const blob = await image.blob();
        const ref = firebase.storage().ref(`${'banner/' }`);
        await ref.put(blob);
        const url = await firebase.storage().ref(`${'banner/'}`).getDownloadURL()

        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/banner.json`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({url:url})
        })

        const resData= await response.json()
        dispatch({type:ADD_BANNER, id:resData.name, url:url })

    }

}

export const addCatBanner = (name, catId, imageUrl) => {

    return async (dispatch, getState) => {

        const image = await fetch(imageUrl);
        const blob = await image.blob();
        const ref = firebase.storage().ref(`${'banner/' }`);
        await ref.put(blob);
        const url = await firebase.storage().ref(`${'banner/'}`).getDownloadURL()

        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/catbanner.json`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({url:url, catId:catId, name:name})
        })

        const resData= await response.json()
        dispatch({type:ADD_CATBANNER, id:resData.name, url:url, name, catId })

    }

}

export const fetchCatBanner = () => {

    return async (dispatch, getState) => {

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/catbanner.json')
        const resData = await response.json()
        let bannerList = []
        for (const key in resData) {
            bannerList.push(new CatBanner(key, resData[key].url, resData[key].catId, resData[key].name))
        }
        console.log('Cat', bannerList)
        dispatch({type:FETCH_CATBANNER, list:bannerList})
    }

}

export const fetchBanner = () => {

    return async (dispatch, getState) => {

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/banner.json')
        const resData = await response.json()
        let bannerList = []
        for (const key in resData) {
            bannerList.push(new BannerModel(key, resData[key].url))
        }
        dispatch({type:FETCH_BANNER, list:bannerList})
    }

}

export const deleteCatBanner = (id) => {

    return async (dispatch, getState) => {

        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/catbanner/${id}.json`,{
            method:'DELETE'
        })

    }

}


export const deleteBanner = (id) => {

    return async (dispatch, getState) => {

        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/banner/${id}.json`,{
            method:'DELETE'
        })

    }

}