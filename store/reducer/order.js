import { FETCh_CANCEL, FETCH_ORDER, FETCH_PROCESSED } from "../action/order"

const initialState = {
    notConfirmed:[],
    confirmed:[],
    assigned:[],
    process:[],
    delivered:[], 
    cancel:[]
}

export default (state=initialState, action) => {

    

        switch(action.type){
            
            case FETCH_ORDER:
                console.log("Action", action.new)
                return{
                    ...state,
                    notConfirmed:action.new,
                    confirmed:action.confirmed,
                }
            case FETCH_PROCESSED:
                return{
                    ...state,
                    assigned:action.assigned,
                    process:action.process,
                    delivered:action.delivered
                }
            case FETCh_CANCEL:
                return{
                    ...state,
                    cancel:action.list
                }
            default:
                return state

        }

   

}