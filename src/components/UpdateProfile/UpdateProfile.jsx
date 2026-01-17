import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';

    export default function UpdateProfile() {
    const formik = useFormik({
        initialValues: { name: '', email: '', phone: '' },
        onSubmit: async (values) => {
        try {
            const { data } = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/users/updateMe`, 
            values,
            { headers: { token: localStorage.getItem('userToken') } }
            );
            toast.success("Profile updated!");
        } catch (err) {
            toast.error("Failed to update profile");
        }
        },
    });

    return (
        <div className="container mx-auto my-12 p-5 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-8">Update Profile :</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
            {['name', 'email', 'phone'].map((field) => (
            <div key={field} className="relative w-full">
                <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-[#ff8a00] peer"
                onChange={formik.handleChange}
                value={formik.values[field]}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ff8a00] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {field}:
                </label>
            </div>
            ))}
            <button type="submit" className="bg-[#ff8a00] text-white px-8 py-2 rounded-md hover:bg-orange-600 transition">
            Update
            </button>
        </form>
        </div>
    );
    }