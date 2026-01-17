import React from 'react'
import style from "./MainSlider.module.css"
import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"
import banner1 from "../../assets/images/ad-banner-1.jpeg"
import banner2 from "../../assets/images/ad-banner-2jpeg.jpg"
import Slider from "react-slick";

export default function MainSlider() {
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

    return (
        <>
            {/* Desktop & Tablet */}
            <div className='hidden md:flex my-6 gap-2 px-2'>
                <div className='w-full md:w-3/4'>
                    <Slider {...settings}>
                        <img 
                            src={slide1} 
                            className='w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded-lg' 
                            alt="slide1" 
                        />
                        <img 
                            src={slide2} 
                            className='w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded-lg' 
                            alt="slide2" 
                        />
                        <img 
                            src={slide3} 
                            className='w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded-lg' 
                            alt="slide3" 
                        />
                    </Slider>
                </div>
                <div className='w-1/4 flex flex-col gap-2'>
                    <img 
                        src={banner1} 
                        className='w-full h-[125px] md:h-[174px] lg:h-[199px] object-cover rounded-lg' 
                        alt="banner1" 
                    />
                    <img 
                        src={banner2} 
                        className='w-full h-[125px] md:h-[174px] lg:h-[199px] object-cover rounded-lg' 
                        alt="banner2" 
                    />
                </div>
            </div>

            {/* Mobile  */}
            <div className='block md:hidden my-4 px-2'>
                <Slider {...settings}>
                    <img 
                        src={slide1} 
                        className='w-full h-[200px] object-cover rounded-lg' 
                        alt="slide1" 
                    />
                    <img 
                        src={slide2} 
                        className='w-full h-[200px] object-cover rounded-lg' 
                        alt="slide2" 
                    />
                    <img 
                        src={slide3} 
                        className='w-full h-[200px] object-cover rounded-lg' 
                        alt="slide3" 
                    />
                    <img 
                        src={banner1} 
                        className='w-full h-[200px] object-cover rounded-lg' 
                        alt="banner1" 
                    />
                    <img 
                        src={banner2} 
                        className='w-full h-[200px] object-cover rounded-lg' 
                        alt="banner2" 
                    />
                </Slider>
            </div>
        </>
    )
}