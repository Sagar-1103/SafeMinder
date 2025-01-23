import {useContext, createContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = props => {
  const [role, setRole] = useState(null);
  const [code, setCode] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [process, setProcess] = useState(false);
  const [caretaker, setCaretaker] = useState({
    id:'',
    name: '',
    email: '',
    number: '',
  });
  const [user,setUser] = useState({
    id:"",
    name:"",
    gender:"",
    dob:"",
    email:"",
    number:""
  })

  const [contacts,setContacts] = useState([]);
  const [isAssigned,setIsAssigned] = useState(false);

  const [userCurrentLocation, setUserCurrentLocation] = useState([0, 0]);
  const [userHomeLocation, setUserHomeLocation] = useState([75, 15]);
  const [radius, setRadius] = useState(1);
  return (
    <LoginContext.Provider
      value={{
        role,
        setRole,
        loggedIn,
        setLoggedIn,
        code,
        setCode,
        caretaker,
        setCaretaker,
        userCurrentLocation,
        setUserCurrentLocation,
        userHomeLocation,
        radius,
        setRadius,
        setUserHomeLocation,
        user,
        setUser,
        isAssigned,
        setIsAssigned,
        process,
        setProcess,
        contacts,
        setContacts
      }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
