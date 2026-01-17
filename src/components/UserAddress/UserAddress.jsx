import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

    export default function UserAddress() {
    const [addresses, setAddresses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('userToken');


    async function getAddresses() {
        try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
            headers: { token }
        });
        setAddresses(data.data);
        } catch (err) {
        console.log(err);
        }
    }


    async function addAddress(values) {
        setIsLoading(true);
        try {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, values, {
            headers: { token }
        });
        if (data.status === "success") {
            toast.success(data.message);
            setIsModalOpen(false);
            getAddresses(); 
            formik.resetForm();
        }
        } catch (err) {
        toast.error("Failed to add address");
        } finally {
        setIsLoading(false);
        }
    }

    async function deleteAddress(id) {
        try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
            headers: { token }
        });
        if (data.status === "success") {
            toast.success(data.message);
            setAddresses(data.data); 
        }
        } catch (err) {
        toast.error("Error deleting address");
        }
    }

    useEffect(() => { getAddresses(); }, []);

    const formik = useFormik({
        initialValues: { name: '', details: '', phone: '', city: '' },
        onSubmit: addAddress,
    });

    return (
        <div className="container mx-auto my-20 px-4">
        <h2 className="text-3xl font-semibold mb-8">Your Addresses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#ff8a00] transition group"
            >
            <i className="fas fa-plus text-4xl text-[#ff8a00] mb-2 transition transform group-hover:scale-110"></i>
            <span className="text-xl font-medium">Add Address</span>
            </div>

            
            {addresses.map((addr) => (
            <div key={addr._id} className="border border-gray-200 rounded-lg p-6 shadow-sm relative">
                <h3 className="font-bold text-lg mb-2">{addr.name}</h3>
                <p className="text-gray-600 mb-1">{addr.details}</p>
                <p className="text-gray-600 mb-1">{addr.phone}</p>
                <p className="text-gray-600 mb-4">{addr.city}</p>
                <button 
                onClick={() => deleteAddress(addr._id)}
                className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition text-sm"
                >
                Delete
                </button>
            </div>
            ))}
        </div>

        
        {isModalOpen && (
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 animate-fade-in">
                <h3 className="text-xl font-bold mb-6">Enter Your Address</h3>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                {['name', 'details', 'phone', 'city'].map((field) => (
                    <div key={field} className="relative">
                    <input
                        type="text"
                        name={field}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-[#ff8a00] peer"
                        onChange={formik.handleChange}
                        value={formik.values[field]}
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#ff8a00]">
                        {field}
                    </label>
                    </div>
                ))}
                
                <div className="flex justify-end space-x-3 mt-8">
                    <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-[#ff8a00] text-white px-6 py-2 rounded shadow hover:bg-orange-600 transition"
                    >
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'ADD'}
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-700 text-white px-6 py-2 rounded shadow hover:bg-red-800 transition"
                    >
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
    }