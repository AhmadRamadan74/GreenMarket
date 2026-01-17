import React, { useEffect } from 'react'    
import style from "./CategorySlider.module.css"
import api from '../../api';
import { useState } from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

export default function CategorySlider() {
    const [categories, setCategories] = useState([]);   
    const navigate = useNavigate();
    
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    
    async function getCategories() {
        let {data} = await api.get('/categories');
        console.log(data.data)
        setCategories(data.data)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCategories();        
    }, [])

    const handleCategoryClick = (categoryId, categoryName) => {
        navigate(`/subcategories/${categoryId}`, { 
            state: { categoryName } 
        });
    };

    return (
        <>
            <hr className='my-5 w-full'/>
            <h1 className='text-2xl md:text-3xl text-[rgba(0,0,0,0.28)] font-bold mb-4 px-2'>
                Popular Categories
            </h1>
            <div className='px-2'>
                <Slider {...settings}>
                    {categories.map((category) => (
                        <div 
                            key={category._id} 
                            className='my-3 cursor-pointer px-2'
                            onClick={() => handleCategoryClick(category._id, category.name)}
                        >
                            <img 
                                src={category.image} 
                                alt={category.name} 
                                className='w-full h-[150px] md:h-[200px] object-cover object-top hover:scale-105 transition-transform duration-300 rounded-lg' 
                            />
                            <h3 className='text-center pt-2 md:pt-4 text-sm md:text-base text-gray-500 hover:text-green-600 transition-colors'>
                                {category.name}
                            </h3>
                        </div>          
                    ))}
                </Slider>
            </div>
        </>
    )
}