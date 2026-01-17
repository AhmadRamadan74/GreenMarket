import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../EmailVerification/EmailVerification";

    export default function ForgetPassword() {
    const [apiError, setApiError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function forgetPassword(values) {
        try {
        setLoading(true);
        setApiError(null);

        const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            values
        );
        setSuccess(data.message);
        navigate("/emailVerification");
        } catch (error) {
        setApiError(error.response?.data?.message);
        } finally {
        setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
        email: "",
        },
        validationSchema: Yup.object({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        }),
        onSubmit: forgetPassword,
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="md:w-1/2 w-full px-4">
            <h2 className="text-xl mb-8 text-center"> Enter your email to reset your password :</h2>

            
            <div className="relative z-0 w-full mb-5 group">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
            />
            <label htmlFor="email"
                className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                peer-focus:text-green-800
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-6" >
                Enter Your email:
            </label>
            </div>

            {formik.errors.email && formik.touched.email && (
            <div className="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft">
                {formik.errors.email}
            </div>
            )}

            
            {apiError && (
            <div className="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft">
                {apiError}
            </div>
            )}

            
            {success && (
            <div className="px-4 py-2 mb-5 text-sm text-green-700 rounded-base bg-green-100">
                {success}
            </div>
            )}

            
            <div className="flex gap-3">
            <button
                type="submit"
                disabled={loading}
                className="text-white !bg-brand hover:bg-mainbrand-strong rounded-base text-sm px-4 py-2.5">
                {loading ? "Sending..." : "Submit"}
            </button>

            <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-white !bg-red-700 hover:bg-red-800 rounded-base text-sm px-4 py-2.5">Cancel</button>
            </div>
        </form>
        </div>
    );
}
