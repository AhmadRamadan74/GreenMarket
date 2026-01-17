import React, { useContext, useState } from 'react'
import style from "./Checkout.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
export default function Checkout() {   

    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    let {cart} = useContext(CartContext);

async function HandleCheckout(shippingAddress){
        try {
            setLoading(true);
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, {
                shippingAddress
            }, {
                headers:{
                    token: localStorage.getItem("userToken")
                }
            });
                // console.log(data);
                toast.success(data.status)
                location.href = data.session.url
        } catch(error){
            setApiError(error.response.data.message);
            setLoading(false);
        }
}

                        // Validation Using Yup 


    
    const formik = useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: ''
        }
        ,onSubmit: HandleCheckout
    })



    return (
        <div className="min-h-screen flex items-center justify-center">
                <form onSubmit={formik.handleSubmit} className="md:w-1/2 w-full px-4">
                <h1 className='text-2xl md:w-custom-width w-full mx-auto mb-10'>Checkout :</h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                    <label htmlFor="city" 
                        className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10  origin-[0] peer-focus:start-0
                            peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                                    rtl:peer-focus:left-auto">Enter Your City: </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                    <label htmlFor="details" 
                        className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10  origin-[0] peer-focus:start-0
                            peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                                    rtl:peer-focus:left-auto">Enter Your Details: </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                    <label htmlFor="phone" 
                        className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10  origin-[0] peer-focus:start-0
                            peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                                    rtl:peer-focus:left-auto">Enter Your Phone: </label>
                </div>

                {loading?  <button type="button" className="text-white bg-brand box-border border border-transparent hover:bg-mainbrand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                    <i className='fas fa-spinner fa-spin'></i>
                </button>: <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-mainbrand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">Submit</button>}
                
                
                </form>         
        </div>
    )
}
