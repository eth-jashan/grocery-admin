
import PriceModel from "../../model/PriceModel"
import ProductModel from "../../model/productModel"
import { ADD_PRICE, ADD_PRODUCT, CLEAR_PRICE, FETCH_PRODUCT } from "../action/product"


const initialState={
    productList:[],
    priceArray:[],
    productCount:0
}

export default (state=initialState, action) => {

    switch(action.type){
        case FETCH_PRODUCT:
            
            const list = action.list
            return{
                ...state,
                productList:list,
                productCount:list.length
            }
        case ADD_PRICE:
            const prices = action.price
            const offer = action.offer
            const offerPrice = action.offerPrice
            const wts = action.wt

            const newPrice = new PriceModel(prices, offerPrice, offer, wts)
            console.log('new', newPrice)
            return{
                ...state,
                priceArray:[...state.priceArray].concat(newPrice)
            }
        case CLEAR_PRICE:
            return{
                ...state,
                priceArray:[]
            }
        case ADD_PRODUCT:
            const id = action.id
            const name = action.name
            const description = action.description
            const catName = action.catName
            const price = action.price
            const url = action.url
            const catId = action.categoryId

            const newItem = new ProductModel(id, name, price,  description, catName, catId, url) 
            const product = [...state.productList]
            console.log("Product", newItem)

            return{
                ...state,
                productList:product.concat(newItem),
                productCount:state.itemCount + 1
            }
        default:
            return state
        }

}