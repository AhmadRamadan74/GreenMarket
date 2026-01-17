import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

    export default function UpdatePassword() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpdatePassword(values) {
        setIsLoading(true);
        try {
        const { data } = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
            values,
            { headers: { token: localStorage.getItem('userToken') } }
        );
        if (data.message === "success") {
            toast.success("Password updated successfully");
        }
        } catch (err) {
        toast.error(err.response?.data.message || "An error occurred");
        } finally {
        setIsLoading(false);
        }
    }

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("Current password is required"),
        password: Yup.string().required("New password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase and be 6-11 chars"),
        rePassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password')], "Passwords do not match"),
    });

    const formik = useFormik({
        initialValues: { currentPassword: '', password: '', rePassword: '' },
        validationSchema,
        onSubmit: handleUpdatePassword,
    });

    return (
        <div className="container mx-auto my-12 p-5 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-8">Update Password :</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
            {[
            { name: 'currentPassword', label: 'current password:', type: 'password' },
            { name: 'password', label: 'new password:', type: 'password' },
            { name: 'rePassword', label: 're-password:', type: 'password' }
            ].map((input) => (
            <div key={input.name} className="relative w-full">
                <input
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-[#ff8a00] peer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[input.name]}
                />
                <label htmlFor={input.name} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ff8a00] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {input.label}
                </label>
                {formik.errors[input.name] && formik.touched[input.name] && <p className="text-red-500 text-xs mt-1">{formik.errors[input.name]}</p>}
            </div>
            ))}

            <button disabled={isLoading} type="submit" className="bg-[#ff8a00] text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Update Password"}
            </button>
        </form>
        </div>
    );
    }