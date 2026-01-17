import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const userEmail = location.state?.email;
    const initialMessage = location.state?.message;

    async function verifyCode(values) {
        try {
            setIsLoading(true);
            setApiError("");
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);

            if (data.status === "Success") {
                navigate("/resetPassword", { state: { email: userEmail } });
            }
        } catch (error) {
            setApiError(error.response?.data?.message || "Invalid or expired code");
        } finally {
            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: { resetCode: "" },
        validationSchema: yup.object({
            resetCode: yup.string().required("Reset code is required"),
        }),
        onSubmit: verifyCode
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="md:w-1/2 w-full px-4">
                <h3 className="text-3xl mb-5 text-center font-bold text-gray-700">Email Verification</h3>
                <h3 className="text-sm mb-14 text-center font-bold text-red-900">
                    Reset code sent to: {userEmail || "your email"}
                </h3>
                
                {initialMessage && !apiError && (
                    <div className="px-4 py-2 mb-5 text-sm text-green-700 rounded-base bg-green-100 text-center">
                        {initialMessage}
                    </div>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.resetCode} 
                            type="text" 
                            name="resetCode" 
                            id="resetCode" 
                            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                            placeholder=" " 
                        />
                        <label htmlFor="resetCode" className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            Enter Verification Code:
                        </label>
                    </div>

                    {formik.errors.resetCode && formik.touched.resetCode && (
                        <div className="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                            {formik.errors.resetCode}
                        </div>
                    )}

                    {apiError && (
                        <div className="px-4 py-2 mb-5 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                            {apiError}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="text-white !bg-amber-500 hover:bg-amber-600 rounded-base text-sm px-4 py-2.5 transition-colors"
                        >
                            {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : "Verify Code"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}