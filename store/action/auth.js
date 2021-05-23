export const LOGIN_ADMIN = 'LOGIN_ADMIN'

export const loginUser = (email, password) => {

    return async (dispatch, getState) => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7WOvpxFTPd06DEDiWax_JX-rzRi5-n9A',{
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
        if(!response.ok){
            const errorData = await response.json();
            const errorId = errorData.error.message;
            console.log(errorData);

            let message='Something Went Wrong';
            if(errorId==='EMAIL_EXISTS'){
                message='Email Already Exists';
            }else if(errorId==='WEAK_PASSWORD : Password should be at least 6 characters'){
                message='Password should be at least 6 characters'
            }
            throw new Error(message)
        }
        const resData = await response.json();

        dispatch({type:LOGIN_ADMIN,userId:resData.localId,token:resData.idToken});
    }
}