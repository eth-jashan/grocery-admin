import { LOGIN_ADMIN } from "../action/auth"

const initialState = {
    uid:null,
    token:null
}

export default (state = initialState, action) => {

    switch(action.type){
        case LOGIN_ADMIN:
            return{
                ...state,
                uid:action.userId,
                token:action.token
            }
        default:
            return state
    }

}