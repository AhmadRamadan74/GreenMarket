import React, { useContext, useState } from 'react'
import style from "./RecentProducts.module.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import {CartContext} from "../../context/CartContext"
import { useQuery } from '@tanstack/react-query';
import { WishlistContext } from '../../context/WishlistContext';

export default function RecentProducts() {
    const {addToCart} = useContext(CartContext)
    const {addToWishlist} = useContext(WishlistContext)
    const [loadingProductId, setLoadingProductId] = useState(null)
    const [loadingWishlistId, setLoadingWishlistId] = useState(null)

    function getRecentProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let {data, isLoading} = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts,
        select: (data) => data.data.data 
    })

    async function handleAddToCart(e, productId) {
        e.preventDefault();
        e.stopPropagation();
        setLoadingProductId(productId)
        await addToCart(productId)
        setLoadingProductId(null)
    }

    async function handleAddToWishlist(e, productId) {
        e.preventDefault();
        e.stopPropagation();
        setLoadingWishlistId(productId)
        await addToWishlist(productId)
        setLoadingWishlistId(null)
    }

    return (
        <>
            {isLoading ? <Loading/>  :
                <div className="py-8 w-full px-2">
                    <hr className='my-4 w-full'/>
                    <div className="flex flex-wrap gap-y-4 justify-center">
                        {data?.map((product)=> 
                            <div key={product.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2">
                                <div className="product p-2 rounded-lg text-center text-[rgba(0,0,0,50)] font-bold text-main h-full flex flex-col">
                                    <Link to={`/productdetails/${product.id}`} className="flex-grow">
                                        <img 
                                            src={product.imageCover} 
                                            className='w-full rounded-lg mb-2' 
                                            alt={product.title} 
                                        />
                                        <h3 className='p-1 text-xs md:text-sm'>{product.category.name}</h3>
                                        <h3 className='text-sm md:text-base pb-4'>
                                            {product.title.split(' ', 2).join(' ')}
                                        </h3>
                                        <div className="flex justify-between text-xs md:text-sm">
                                            <span>{product.price} EGP</span>
                                            <span> 
                                                <i className='fas fa-star rating-color'></i> {product.ratingsAverage} 
                                            </span>
                                        </div>
                                    </Link>
                                    
                                    <div className="text-center mt-2 flex gap-2 justify-center">
                                        <button 
                                            onClick={(e) => handleAddToCart(e, product.id)} 
                                            disabled={loadingProductId === product.id}
                                            className={`btn flex-1 ${loadingProductId === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        > 
                                            {loadingProductId === product.id ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                <i className="fas fa-shopping-cart"></i>
                                            )}
                                        </button>
                                        <button 
                                            onClick={(e) => handleAddToWishlist(e, product.id)} 
                                            disabled={loadingWishlistId === product.id}
                                            className={`btn flex-1 ${loadingWishlistId === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {loadingWishlistId === product.id ? (
                                                <i className="fas fa-spinner fa-spin text-xl"></i>
                                            ) : (
                                                <i className="fa-regular fa-heart text-xl cursor-pointer duration-500 group-hover:text-main"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>      
            }   
        </>
    )
}