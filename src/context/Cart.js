import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export let CartContext = createContext();

export default function CartProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true)
    const baseUrl = 'https://ecommerce.routemisr.com'
    const headers = {
        token: localStorage.getItem('userToken')
    }
    const [cartLength, setCartLength] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [shippingPrice, setShippingPrice] = useState(0)

    function getUserCart() {
        setIsLoading(true)
        return axios.get(`${baseUrl}/api/v1/cart`, {
            headers,
        })
            .then((res) => {
                setCartLength(res.data.numOfCartItems);
                setCartItems(res.data);
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
            });
    }
    
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            getUserCart();
        }
    }, []);

    function updateProductQty(productId, count) {
        return axios.put(`${baseUrl}/api/v1/cart/${productId}`, {
            count
        }, {
            headers,
        })
            .then((res) => {
                setCartItems(res.data);
                setIsLoading(false);
            })
            .catch((err) => err);
    }

    function addToCart(productId) {
        return axios.post(`${baseUrl}/api/v1/cart`, {
            productId: productId
        }, {
            headers,
        })
            .then((res) => {
                getUserCart();
                return res;
            })
            .catch((err) => err);
    }
    function deleteProductFromCart(productId) {
        return axios.delete(`${baseUrl}/api/v1/cart/${productId}`, {
            headers,
        })
            .then((res) => {
                setCartItems(res.data);
                setIsLoading(false);
                if (res.data.status === 'success') {
                    toast.success('Product removed from cart', { position: "top-center", autoClose: 1500 });
                } else {
                    toast.error(res.data.message, { position: "top-center", autoClose: 1500 });
                }
                return res
            })
            .catch((err) => err);
    }

    return (
        <CartContext.Provider
            value={{
                addToCart,
                cartLength,
                setCartLength,
                getUserCart,
                updateProductQty,
                cartItems,
                isLoading,
                deleteProductFromCart,
                shippingPrice,
                setShippingPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}