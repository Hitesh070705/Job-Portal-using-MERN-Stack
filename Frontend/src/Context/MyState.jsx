import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios";

const MyState = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8011/user/getUser",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthorized]);
  return (
    <>
      <MyContext.Provider value={{isAuthorized,setIsAuthorized,user,setUser}}>
      {props.children}
    </MyContext.Provider>
    </>
  )
}

export default MyState
