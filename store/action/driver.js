import DriverModel from "../../model/driverModel"

export const ADD_DRIVER = 'ADD_DRIVER'
export const DRIVER_FETCH = 'DRIVER_FETCH'

export const addDriver = (fullName,phoneNumber, email, password) => {

    return async (dispatch, getState)=>{

        const uid = getState().auth.uid

        const signup = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7WOvpxFTPd06DEDiWax_JX-rzRi5-n9A',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        });

         

        const signupData = await signup.json()
        console.log("signup", signupData)

        const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/driver.json?`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:fullName,
                phoneNumber:phoneNumber,
                compId:uid,
                uid:signupData.localId, 
                email:email
            })
        })

        const resData = await response.json()

        dispatch({type:ADD_DRIVER, id:resData.name, name:fullName, phoneNumber:phoneNumber,  compId:uid, uid:signupData.name, email}) 

    }
}

export const driverFetch = () => {
    return async (dispatch, getState)=>{
    
    const uid = getState().auth.userId
    const response = await fetch(`https://grocery-app-6bdd0-default-rtdb.firebaseio.com/driver.json?`)
    const resData = await response.json()
    
    const driverList = []

    for(const keys in resData){
    driverList.push(new DriverModel(keys, resData[keys].name,resData[keys].email, resData[keys].phoneNumber, resData[keys].uid, resData[keys].compId))
    }

    dispatch({type:DRIVER_FETCH, list:driverList})

}}