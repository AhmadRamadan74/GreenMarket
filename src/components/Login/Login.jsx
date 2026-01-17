import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
export default function Login() {   

    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    let {setUserToken} = useContext(UserContext);
    let navigate = useNavigate(); // allows for me to navigate from like button to the component 

    async function login(values){
            try {
                setLoading(true);
                let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values);
                localStorage.setItem('userToken', data.token);
                setUserToken(data.token)
                navigate('/'); 
            } catch(error){
                setApiError(error.response.data.message);
                setLoading(false);
            }
    }
    // async function login(values){
    //     try{
    //         setLoading(true);
    //         let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values);
    //         console.log(data);
    //         localStorage.setItem('userToken' , data.token)
    //         navigate('/home');
    //     }catch(error){
    //         console.log(error.response.data.message);
    //         setApiError(error.response.data.message);
    //         setLoading(false);
    //     }
    // }
                        // Validation Using Yup 


    let validationSchema = Yup.object().shape({
        email: Yup.string().required("Email Is Required").email("Email Is Invalid"),
        password: Yup.string().required("Password Is Required").matches(/^[A-Z]\w{4,10}/ , 'Invalid Password ex(Ahmad2021)'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema // if the key == value we can ignore the value and just put the key 
        // validate: validateForm
        ,onSubmit: login
    })



    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={formik.handleSubmit} className="md:w-1/2 w-full px-4">
                            <h1 className='text-2xl md:w-custom-width w-full mx-auto mb-10'>Login :</h1>
                {apiError && <div class="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    {apiError}
                </div>}
                


                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                    <label htmlFor="email" 
                        className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10  origin-[0] peer-focus:start-0
                            peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                                    rtl:peer-focus:left-auto">Enter Your email: </label>
                </div>
                {formik.errors.email && formik.touched.email && <div class="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    {formik.errors.email}
                </div>}


                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                    <label htmlFor="password" 
                        className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10  origin-[0] peer-focus:start-0
                            peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                                    rtl:peer-focus:left-auto">Enter Your password: </label>
                </div>
                
                
                {formik.errors.password && formik.touched.password && <div class="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    {formik.errors.password}
                </div>} 

                <div className="flex justify-between">
                    {loading?  <button type="button" className="text-white bg-brand box-border border border-transparent hover:bg-mainbrand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                    <i className='fas fa-spinner fa-spin'></i>
                </button>: <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-mainbrand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">Submit</button>}
                <Link to={"/forgetPassword"} className='duration-300 text-blue-600 hover:underline'>Forget Password ?</Link>
                </div>
                <div className="md:w-custom-width w-full mx-auto my-5"> Don't have an email ?
                    <Link className="duration-300 text-blue-600 hover:underline " to={"/register"}>{" "}Register</Link>
                </div>
            </form>
        </div>
    )
}