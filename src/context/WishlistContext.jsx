import axios from "axios";
import { createContext, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useState } from 'react';
import { UserContext } from "./UserContext";
import api from "../api";


// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    
    const [wishList, setwishList] = useState(null);
    const {userToken} = useContext(UserContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
            if(userToken){
                getWishlist();
            }
            else{
                setwishList(null);
            }
    },[userToken])

    async function addToWishlist(productId) {
        let {data} = await api.post(`/wishlist` , {productId} );
        await getWishlist(); 
        toast.success(data.message , {
            duration:3000,
            style:{
                borderRadius:"10px",
                background:"#333",
                color:"#fff",
                textAlign: "center"
            }
        });   
    }
    

    async function deleteFromWishlist(productId) {
            try{
                    let {data} = await api.delete(`/wishlist/${productId}`);
                    await getWishlist();
                    toast.success(data.message , {
                duration:3000,
                                style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                    });
            }catch(err){
                console.log(err)
            }
    }


    async function getWishlist() { 
        try{    
            const { data } = await api.get("/wishlist");
            setwishList(data);
        }
        catch(err){
            console.log(err);
        }
    }
    


    return(
        <>
        <WishlistContext.Provider value={{addToWishlist , getWishlist , wishList , deleteFromWishlist}}>
            {children}

        </WishlistContext.Provider>
        </>
    )
}