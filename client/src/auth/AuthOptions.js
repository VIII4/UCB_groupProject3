import React, { useContext} from "react" ;
import {useHistory} from "react-router-dom" ;
import UserContext from "../context/UserContext" ;


export default function AuthOptions() {

    const {userData, setUserData} = useContext(UserContext) ;

    const history = useHistory();

    const add = () => history.push("/add")
    const login = () => history.push("/login")
    const logout = () => {
        setUserData({
            token: undefined, 
            user: undefined
        })
        localStorage.setItem("auth-token" , "")

    }
};

return (

    <nav className="auth-options">
        {userData.user ? (<button onClick={logout}>Log Out</button>) : 
        (<>
        <button onClick={add}>Register</button>
        <button onClick={login}>Log In</button>
        </>
        )}
    </nav>
) ;



