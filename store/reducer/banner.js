import BannerModel from "../../model/BannerModel"
import CatBanner from "../../model/CategoryBanner"
import { ADD_BANNER, ADD_CATBANNER, FETCH_BANNER, FETCH_CATBANNER } from "../action/banner"

const initialState = {
    list:[],
    catList:[]
}

export default (state=initialState, action) => {

    switch(action.type){

        case ADD_BANNER:
            const newBanner = new BannerModel(action.id, action.url)
            const list = [...state.list]
            return{
                ...state,
                list:list.concat(newBanner)
        }
        case ADD_CATBANNER:
            const newCatbanner = new CatBanner(action.id, action.url, action.catId, action.name)
            const newlist = [...state.catList]
            return{
                ...state,
                catList:newlist.concat(newCatbanner)
            }
        
        case FETCH_CATBANNER:
            return{
                ...state,
                catList:action.list
            }
        
        case FETCH_BANNER:
            return{
                ...state,
                list:action.list
            }
        default:
            return state

    }

}