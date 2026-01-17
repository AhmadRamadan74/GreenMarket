import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Get email from the previous navigation state
    const userEmail = location.state?.email;

    async function handleResetPassword(values) {
        try {
            setIsLoading(true);
            setApiError("");

            // API usually requires email and newPassword
            const { data } = await axios.put( `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
                {
                    email: userEmail,
                    newPassword: values.newPassword
                }
            );

            // On success, RouteMisr API typically returns a token
            if (data.token) {
                navigate("/login");
            }
        } catch (error) {
            setApiError(error.response?.data?.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            newPassword: "",
        },
        validationSchema: yup.object({
            newPassword: yup.string()
                .required("New password is required")
                .min(6, "Password must be at least 6 characters"),
        }),
        onSubmit: handleResetPassword
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="md:w-1/2 w-full px-4">
                <h3 className="text-3xl mb-10 text-center font-bold text-gray-700">Reset Password</h3>
                
                <form onSubmit={formik.handleSubmit}>
                    {/* New Password Input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.newPassword} 
                            type="password" 
                            name="newPassword" 
                            id="newPassword" 
                            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                            placeholder=" " 
                        />
                        <label htmlFor="newPassword" className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            Enter New Password:
                        </label>
                    </div>

                    {formik.errors.newPassword && formik.touched.newPassword && (
                        <div className="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft">
                            {formik.errors.newPassword}
                        </div>
                    )}

                    {apiError && (
                        <div className="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft">
                            {apiError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="text-white !bg-brand hover:bg-mainbrand-strong rounded-base text-sm px-4 py-2.5 transition-colors"
                    >
                        {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <Link to="/login">Update Password</Link>}
                    </button>
                </form>
            </div>
        </div>
    );
}