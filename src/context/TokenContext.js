import { createContext } from "react";
import { useState } from "react";

export let TokenContext = createContext();

export default function TokenProvider(props) {
    let [token, setToken] = useState(null);
    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {props.children}
        </TokenContext.Provider>
    )
}