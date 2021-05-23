import DriverModel from "../../model/driverModel"
import { ADD_DRIVER, DRIVER_FETCH } from "../action/driver"

const initialState = {
    driverList:[],
    driverCount:0
}

export default (state = initialState, action)=>{

    switch(action.type){
        case ADD_DRIVER:
            
        const newDriver = new DriverModel(action.id, action.name,  action.email, action.phonenumber, action.uid, action.compId)

        return{
            ...state,
            driverList:[...state.driverList].concat(newDriver),
            driverCount:state.driverCount + 1
        }

        case DRIVER_FETCH:
            return{
                driverList:action.list,
                driverCount:action.list.length
            }

        default:
            return state
    }

}