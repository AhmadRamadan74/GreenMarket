import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';


export default function ProductDetails() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    let {addToCart} = useContext(CartContext);
    let {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);

    async function getProduct(productId){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        setProduct(data.data);
        setLoading(false);
    }

    async function handleAddToCart() {
        setAddingToCart(true);
        await addToCart(product.id);
        setAddingToCart(false);
    }

    useEffect(()=> {
        getProduct(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading ? <Loading/> :
                <div className='flex p-6 items-center'>
                    <div className='w-1/4'>
                        <Slider {...settings}>
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    className="w-full"
                                    alt={product.title}
                                />
                            ))}
                        </Slider>
                    </div>
                    <div className='w-3/4 ps-4'>
                        <h2>{product.title}</h2>
                        <p className='m-2 text-gray-600'>{product.description}</p>
                        <p className='m-2 text-gray-600'>{product.category.name}</p>
                        <div className='flex justify-between'>
                            <span>{product.price} EGP</span>
                            <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
                        </div>
                        <button 
                            onClick={handleAddToCart} 
                            disabled={addingToCart}
                            className={`btn w-full ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {addingToCart ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Adding...
                                </>
                            ) : (
                                'Add To Cart'
                            )}
                        </button>
                    </div>
                </div>
            }
        </>  
    )
}