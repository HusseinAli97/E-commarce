import { useState,createContext } from "react";
export let counterContext= createContext();

export default  function CounterContextProvider(props) {
    let [counter, setCounter] = useState(10);

    return <counterContext.Provider value={{counter,setCounter}}>
        {props.children}
        </counterContext.Provider>;
}
