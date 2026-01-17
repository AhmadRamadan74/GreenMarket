import React, { useState } from 'react'
import styles from './Footer.module.css';
import amazonPay from '../../assets/images/footer/amazon-pay.png'
import americanExpress from '../../assets/images/footer/american-express.png'
import masterCard from '../../assets/images/footer/master-card.png'
import payPal from '../../assets/images/footer/paypal.png'
import googlePlay from '../../assets/images/footer/googlePlay.png'
import appStore from '../../assets/images/footer/appStore.png'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
        <footer className="py-8 bg-[#222] shadow-[0_0_3px] shadow-blue-950 w-full">
            <div className="container mx-auto px-4 text-[#fff]">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="text-center md:text-left">
                        <h3 className='text-2xl font-semibold mb-2'>Get the FreshCart app</h3>
                        <p className='text-gray-400'>We will send you a link, open it on your phone to download the app.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 items-stretch">
                        <input 
                            className='flex-1 border-0 outline-none px-4 py-3 rounded-md shadow text-gray-800' 
                            type="email" 
                            name="email" 
                            id="footerEmail" 
                            placeholder='Email ..' 
                        />
                        <button className='bg-main text-white font-medium px-8 py-3 rounded-md hover:bg-green-600 transition-colors duration-300'>
                            Share App Link
                        </button>
                    </div>

                    <div className='flex flex-col md:flex-row md:justify-between items-center gap-6 border-y-2 border-gray-600 py-6'>
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <h4 className='text-base font-medium whitespace-nowrap'>Payment Partners</h4>
                            <div className="flex items-center gap-2">
                                <img className='w-12 h-8 object-contain bg-white rounded p-1' src={amazonPay} alt="Amazon Pay" />
                                <img className='w-12 h-8 object-contain bg-white rounded p-1' src={americanExpress} alt="American Express" />
                                <img className='w-12 h-8 object-contain bg-white rounded p-1' src={masterCard} alt="Master Card" />
                                <img className='w-12 h-8 object-contain bg-white rounded p-1' src={payPal} alt="PayPal" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <h4 className='text-base font-medium whitespace-nowrap'>Get deliveries with FreshCart</h4>
                            <div className="flex items-center gap-2">
                                <img className='h-10 object-contain cursor-pointer hover:scale-105 transition-transform duration-300' src={appStore} alt="App Store" />
                                <img className='h-10 object-contain cursor-pointer hover:scale-105 transition-transform duration-300' src={googlePlay} alt="Google Play" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 text-xl pb-4">
                        <Link
                            className="duration-300 hover:text-main hover:scale-110 transition-transform"
                            target="_blank"
                            to="https://www.instagram.com/7mbolah/"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                        <Link
                            className="duration-300 hover:text-main hover:scale-110 transition-transform"
                            target="_blank"
                            to="https://www.facebook.com/amdoka99"
                        >
                            <i className="fa-brands fa-facebook"></i>
                        </Link>
                        <Link
                            className="duration-300 hover:text-main hover:scale-110 transition-transform"
                            target="_blank"
                            to="https://x.com/RMDN7_7"
                        >
                            <i className="fa-brands fa-x-twitter"></i>
                        </Link>
                        <Link
                            className="duration-300 hover:text-main hover:scale-110 transition-transform"
                            target="_blank"
                            to="https://www.linkedin.com/in/ahmad-elemam-dev/"
                        >
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}