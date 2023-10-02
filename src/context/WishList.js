import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export let wishListContext = createContext();

export default function WishListProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true)
    const [wishListCount, setWishListCount] = useState(0);
    const [wishListId, setWishListId] = useState([]);
    const baseUrl = 'https://ecommerce.routemisr.com'
    const headers = {
        token: localStorage.getItem('userToken')
    }
    let [wishListItems, setWishListItems] = useState([]);

    function getUserWishList() {
        return axios.get(`${baseUrl}/api/v1/wishlist`, {
            headers,
        })
        .then((res) => {
            setIsLoading(false);
            setWishListCount(res?.data?.count);
            setWishListItems(res?.data?.data);
            res.data.data.map((item)=>{
                wishListId.push(item._id)
            })
        })
        .catch((err) => err);
    }
    useEffect(() => {
        if(localStorage.getItem('userToken')) {
            getUserWishList();
        }
    }, []);
    // function updateProductQty(productId, count) {
    //     return axios.put(`${baseUrl}/api/v1/wishList/${productId}`, {
    //         count
    //     }, {
    //         headers,
    //     })
    //     .then((res) => {
    //         setwishListItems(res.data);
    //         setIsLoading(false);
    //     })
    //     .catch((err) => err);
    // }

    function addToWishList(productId) {
        return axios.post(`${baseUrl}/api/v1/wishList`, {
            productId: productId
        }, {
            headers,
        })
        .then((res) => {
            if(res.status===200){
                toast.success('Product added to wishList', { position: "top-center", autoClose: 1500 });
            }
            getUserWishList();
            setWishListId(res?.data?.data)
            return res;
        })
        .catch((err) => 
        toast.error(err.response.data.message, { position: "top-center", autoClose: 1500 })
        );
    }
    function deleteFromWshList(productId) {
        return axios.delete(`${baseUrl}/api/v1/wishList/${productId}`, {
            headers,
        })
        .then((res) => {
            setIsLoading(false);
            if (res.data.status === 'success') {
                toast.success('Product removed from wishList', { position: "top-center", autoClose: 1500 });
            }
            getUserWishList();
            setWishListId(res?.data?.data)
            return res
        })
        .catch((err) => {
            toast.error(err.response.data.message, { position: "top-center", autoClose: 1500 });
        });
    }

    return(
        <wishListContext.Provider value={{addToWishList,wishListItems,wishListCount,deleteFromWshList,wishListId,isLoading,getUserWishList}}>
            {children}
        </wishListContext.Provider>
    )
}