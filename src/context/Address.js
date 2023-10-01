import { useState,createContext } from "react";
export let addressContext= createContext();

export default  function AddressProvider(props) {
    const [addressReauired, setAddressRequierd] = useState(true);
    const [currantAddress, setCurrantAddress] = useState(0);
    const [data, setData] = useState({});



    return <addressContext.Provider value={{addressReauired,setAddressRequierd,currantAddress,setCurrantAddress,data,setData}}>
        {props.children}
        </addressContext.Provider>;
}
