export const FETCH_ORDER = 'FETCH_ORDER'
export const FETCH_PROCESSED = 'FETCH_PROCESSED'
export const FETCh_CANCEL = 'FETCh_CANCEL'

import OrderModel from '../../model/OrderModel'
import CancelModel from '../../model/CancelModel'


export const fetchOrder = () => {

    return async (dispatch, getState) => {

        
        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order.json?')
        let orderList = []
        const resData = await response.json()
        
        for(const key in resData){
            orderList.push(new OrderModel(key, resData[key].number, resData[key].order, resData[key].orderTotal, resData[key].date, resData[key].status, resData[key].address, resData[key].payment, resData[key].uid, false, false, false))                                                             
        }
        
        dispatch({type:FETCH_ORDER, new:orderList.filter(x=>x.status === 'Not Confirmed'), confirmed:orderList.filter(x=>x.status === 'Confirmed')})

    }


}

export const fetchProcessed = () => {

    return async (dispatch, getState) => {

        
        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order.json?')
        let orderList = []
        const resData = await response.json()
        for (const key in resData){
            orderList.push(new OrderModel(key, resData[key].number, resData[key].order, resData[key].orderTotal, resData[key].date, resData[key].status, resData[key].address, resData[key].paymentMode, resData[key].uid, resData[key].did, resData[key].dName, resData[key].dNum))
        }
        console.log('assigned')
        dispatch({type:FETCH_PROCESSED, assigned:orderList.filter(x=>x.status === 'Delivery Assigned'), process:orderList.filter(x=>x.status === 'Out For Delivery'), delivered:orderList.filter(x=>x.status === 'Delivered')})
    }


}


export const orderStatus = (id, status) => {

    return async (dispatch, getState) => {

        console.log(id, status)
        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order/${id}.json?`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                status:status
            })
        })


    }

}

export const deliverAssignment = (id, name, number, did, status) => {
    return async (dispatch, getState) => {

        await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/order/${id}.json?`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                status:status,
                did:did,
                dName:name,
                dNum:number
            })
        })

    }

}

export const fetchCancel = () => {

    return async (dispatch, getState) => {

        const response = await fetch('https://grocery-app-6bdd0-default-rtdb.firebaseio.com/cancel.json?')
        const list = []
        const resData = await response.json()
        
        for(const key in resData){
            list.push(new CancelModel(key, resData[key].reason, resData[key].name, resData[key].uid, resData[key].orderId))
        }  
        dispatch({type:FETCh_CANCEL, list})
    }

}