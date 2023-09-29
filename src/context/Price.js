import { useState,createContext } from "react";
export let priceContext= createContext();

export default  function PriceProvider(props) {
    let [priceCHange, setPriceChange] = useState("usd");

    return <priceContext.Provider value={{priceCHange,setPriceChange}}>
        {props.children}
        </priceContext.Provider>;
}
