import React, { Component , useState , useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import ContextBtn from "./components/ContextBtn";
import Axios from "axios"
import UserContext from "./context/UserContext" ;
import { FaUserNurse } from "react-icons/fa";

// if data coming from db use state because this information will have to change

function App (props){



  const [isLoading, setLoading] = useState({isLoading: false});
    const [userData, setUserData] = useState({
      token: undefined,
      user: undefined,
     }) ;

     const loading = (toggle) => {
      setLoading({ isLoading: toggle });
    };

      useEffect(() => {
        const checkLoggedIn = async () => {
          let token = localStorage.getItem("auth-token")
          if (token === null) {
            localStorage.setItem("auth-token", "")
          }
          const tokenRes = await Axios.post(
            "/tokenIsValid",
            null,
            {headers: {"x-auth-token" : token} }
          );

          if(tokenRes.data) {

            const userRes = await Axios.get("/users/" , {headers: {"x-auth-token" : token},
          });
          setUserData({
            token,
            user: userRes.data,
          });
          }
        };

        checkLoggedIn();

      }, [])

 



    return (
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
        <div>
          {isLoading && <Loader />}
          <Sidebar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Main {...props} loading={loading} />}
            />
          </Switch>

          <ContextBtn />
        </div>
        </UserContext.Provider>
      </Router>
    );
  
}

export default App;
