import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading/Loading";

    export default function AllOrders() {
    const token = localStorage.getItem("userToken");
    const decoded = token ? jwtDecode(token) : null;

    const [userOrders, setUserOrders] = useState([]);
    const [visibleItems, setVisibleItems] = useState({});
    const [loading, setLoading] = useState(true);

    function handleViewItems(orderId) {
        setVisibleItems((prev) => ({
        ...prev,
        [orderId]: !prev[orderId],
        }));
    }

    async function getUserOrders() {
        try {
        const { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`
        );
        setUserOrders(data);
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        if (decoded?.id) {
        getUserOrders();
        }
    }, []);

    if (loading) return <Loading />;

    return (
        <section className="bg-gray-100 py-10">
        <div className="container mx-auto p-4">
            <header className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-center mb-2">
                Welcome, {decoded.name}!
            </h1>
            <p className="text-gray-600 text-center">
                You have placed {userOrders.length} orders.
            </p>
            </header>

            <div className="space-y-10">
            {userOrders.map((order) => (
                <div key={order.id} className="bg-gray-300 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <h3 className="text-xl font-semibold"> Order #{order.id}</h3>
                    <div>
                    <p className="text-gray-600">Date: {new Date(order.paidAt).toLocaleDateString()}</p>
                    <p className="text-gray-600">Total: {order.totalOrderPrice} EGP</p>
                    <p className="text-gray-600">Payment Method: {order.paymentMethodType}
                    </p>
                    </div>

                    <div>
                    <p className="text-gray-600 font-semibold mb-1">
                        Shipping Address
                    </p>
                    <p>{order.shippingAddress.details}</p>
                    <p>{order.shippingAddress.phone}</p>
                    <p>{order.shippingAddress.city}</p>
                    </div>

                    <div>
                    <p className="text-gray-600 mb-1">Status</p>
                    {order.shippingAddress.isDelivered ? (
                        <span className="px-3 py-1 rounded bg-green-100 text-green-800">
                        Delivered
                        </span>
                    ) : (
                        <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-800">
                        Pending
                        </span>
                    )}
                    </div>

                    <div className="flex justify-center items-center">
                    <button onClick={() => handleViewItems(order.id)} className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">{visibleItems[order.id] ? "Hide Items" : "View Items"}</button>
                    </div>
                </div>

                {visibleItems[order.id] && (
                    <div className="mt-8 w-full">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.cartItems.map((item, index) => (
                            <tr key={index} className="border-b">
                            <td className="p-3">
                                <img src={item.product.imageCover} alt={item.product.title} className="w-12 h-12 object-cover rounded"/>
                            </td>
                            <td className="p-3">{item.product.title}</td>
                            <td className="p-3">{item.count}</td>
                            <td className="p-3">{item.price} EGP</td>
                            <td className="p-3">
                                {item.price * item.count} EGP
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }
