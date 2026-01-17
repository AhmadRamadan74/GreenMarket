import React, { useContext, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";

export default function WishList() {
    const { wishList, deleteFromWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const [loadingProducts, setLoadingProducts] = useState({});

    if (!wishList) return <Loading />;

    const handleAddToCart = async (productId) => {
        setLoadingProducts(prev => ({ ...prev, [productId]: true }));
        await addToCart(productId);
        setTimeout(() => {
            setLoadingProducts(prev => ({ ...prev, [productId]: false }));
        }, 1000);
    };

    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-xl py-6 md:py-10 my-4 md:my-28 mx-2 md:mx-4 lg:mx-16 bg-gray-50 dark:bg-gray-900">
            <div className="text-center mb-6 md:mb-8">
                <p className="text-red-500 mb-2">
                    <i className="fa-regular fa-heart fa-3x md:fa-4x"></i>
                </p>
                <h3 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200">
                    My Wishlist
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
                    You have {wishList.data.length} items in your wishlist
                </p>
            </div>

            {/* Mobile View - Cards */}
            <div className="block md:hidden space-y-4 px-4">
                {wishList.data.map((item) => {
                    const isLoading = loadingProducts[item._id];
                    
                    return (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                        >
                            <div className="flex gap-4 mb-3">
                                <img
                                    src={item.imageCover}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-green-600 dark:text-green-400 font-bold">
                                        {item.price} EGP
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteFromWishlist(item._id)}
                                    className="text-red-500 hover:text-red-600 h-fit"
                                >
                                    <i className="fa-solid fa-trash fa-lg"></i>
                                </button>
                            </div>

                            <button
                                disabled={isLoading}
                                onClick={() => handleAddToCart(item._id)}
                                className={`w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Adding...
                                    </>
                                ) : (
                                    'Add To Cart'
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Desktop View - Table */}
            <table className="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    {wishList.data.map((item) => {
                        const isLoading = loadingProducts[item._id];
                        
                        return (
                            <tr
                                key={item._id}
                                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                            >
                                <td className="p-4">
                                    <img
                                        src={item.imageCover}
                                        alt={item.title}
                                        className="w-24 lg:w-32 h-24 lg:h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                                    />
                                </td>

                                <td className="px-4 lg:px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                                    {item.title}
                                </td>

                                <td className="px-4 lg:px-6 py-4 font-semibold text-green-600 dark:text-green-400">
                                    {item.price} EGP
                                </td>

                                <td className="px-4 lg:px-6 py-4">
                                    <button
                                        disabled={isLoading}
                                        onClick={() => handleAddToCart(item._id)}
                                        className={`bg-green-500 hover:bg-green-600 text-white px-3 lg:px-4 py-2 rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 shadow-md ${
                                            isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                Adding...
                                            </>
                                        ) : (
                                            'Add To Cart'
                                        )}
                                    </button>
                                </td>

                                <td className="px-4 lg:px-6 py-4">
                                    <button
                                        onClick={() => deleteFromWishlist(item._id)}
                                        className="text-red-500 hover:text-red-600 transition-colors duration-300"
                                    >
                                        <i className="fa-solid fa-trash fa-2x"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}