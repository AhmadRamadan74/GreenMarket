import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Cart() {
  const {
    cart,
    updateProductCountToCart,
    deleteProductFromCart,
    clearCart,
  } = useContext(CartContext);

  const { addToWishlist } = useContext(WishlistContext);
  
  const [loadingProducts, setLoadingProducts] = useState({});

  if (!cart) return <Loading />;

  const products = cart.data?.products || [];
  const totalPrice = cart.data?.totalCartPrice || 0;

  const handleUpdateCount = async (productId, newCount) => {
    setLoadingProducts(prev => ({ ...prev, [productId]: true }));
    await updateProductCountToCart(productId, newCount);
    setTimeout(() => {
      setLoadingProducts(prev => ({ ...prev, [productId]: false }));
    }, 1000);
  };

  const handleAddToWishlist = async (productId) => {
    setLoadingProducts(prev => ({ ...prev, [`wishlist-${productId}`]: true }));
    await addToWishlist(productId);
    await deleteProductFromCart(productId);
    setTimeout(() => {
      setLoadingProducts(prev => ({ ...prev, [`wishlist-${productId}`]: false }));
    }, 1000);
  };

  const handleClearCart = async () => {
    setLoadingProducts(prev => ({ ...prev, clearCart: true }));
    await clearCart();
    setTimeout(() => {
      setLoadingProducts(prev => ({ ...prev, clearCart: false }));
    }, 1000);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-xl py-6 md:py-10 my-4 md:my-8 mx-2 md:mx-4 lg:mx-16 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-red-500 mb-2">
            <i className="fa-solid fa-cart-shopping fa-3x md:fa-4x"></i>
          </p>
          <h3 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200">
            My Cart
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
            You have {products.length} items in your cart
          </p>
        </div>

        {/* Mobile View - Cards */}
        <div className="block md:hidden space-y-4 px-4">
          {products.map((item) => {
            const isLoading = loadingProducts[item.product._id];
            const isWishlistLoading = loadingProducts[`wishlist-${item.product._id}`];
            
            return (
              <div
                key={item.product._id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
              >
                <div className="flex gap-4 mb-3">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">
                      {item.product.title}
                    </h3>
                    <p className="text-green-600 dark:text-green-400 font-bold">
                      {item.price} EGP
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProductFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-600 h-fit"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={item.count === 1 || isLoading}
                      onClick={() => handleUpdateCount(item.product._id, item.count - 1)}
                      className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm h-7 w-7 transition-opacity ${
                        (item.count === 1 || isLoading) ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                      }`}
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center font-medium">
                      {item.count}
                    </span>
                    <button
                      disabled={isLoading}
                      onClick={() => handleUpdateCount(item.product._id, item.count + 1)}
                      className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm h-7 w-7 transition-opacity ${
                        isLoading ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                      }`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={isWishlistLoading}
                    onClick={() => handleAddToWishlist(item.product._id)}
                    className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 shadow-md ${
                      isWishlistLoading ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View - Table */}
        <table className="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 lg:px-16 py-3">Image</th>
              <th className="px-4 lg:px-6 py-3">Product</th>
              <th className="px-4 lg:px-6 py-3">Qty</th>
              <th className="px-4 lg:px-6 py-3">Price</th>
              <th className="px-4 lg:px-6 py-3">Wishlist</th>
              <th className="px-4 lg:px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              const isLoading = loadingProducts[item.product._id];
              const isWishlistLoading = loadingProducts[`wishlist-${item.product._id}`];
              
              return (
                <tr
                  key={item.product._id}
                  className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 lg:w-32 h-20 lg:h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                    />
                  </td>

                  <td className="px-4 lg:px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                    {item.product.title}
                  </td>

                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        disabled={item.count === 1 || isLoading}
                        onClick={() => handleUpdateCount(item.product._id, item.count - 1)}
                        className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm h-6 w-6 transition-opacity ${
                          (item.count === 1 || isLoading) ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                        }`}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center font-medium">
                        {item.count}
                      </span>
                      <button
                        disabled={isLoading}
                        onClick={() => handleUpdateCount(item.product._id, item.count + 1)}
                        className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm h-6 w-6 transition-opacity ${
                          isLoading ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="px-4 lg:px-6 py-4 font-semibold text-green-600 dark:text-green-400">
                    {item.price} EGP
                  </td>

                  <td className="px-4 lg:px-6 py-4">
                    <button
                      disabled={isWishlistLoading}
                      onClick={() => handleAddToWishlist(item.product._id)}
                      className={`bg-red-500 hover:bg-red-600 text-white px-3 lg:px-4 py-2 rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 shadow-md ${
                        isWishlistLoading ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                      }`}
                    >
                      Add To Wishlist
                    </button>
                  </td>

                  <td className="px-4 lg:px-6 py-4">
                    <button
                      onClick={() => deleteProductFromCart(item.product._id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      <i className="fa-solid fa-trash fa-lg"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center px-4">
        <button
          disabled={loadingProducts.clearCart}
          onClick={handleClearCart}
          className={`mb-4 w-full md:w-32 font-bold text-white px-4 py-2 rounded-lg bg-red-600 hover:!bg-red-700 transition-all duration-300 ${
            loadingProducts.clearCart ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
          }`}
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center mt-6 gap-4 px-4">
        <h2 className="text-xl md:text-2xl font-bold">Total Price: {totalPrice} EGP</h2>

        <Link to="/checkout">
          <button className="text-white bg-brand px-6 py-2 rounded-lg w-full md:w-auto">
            Checkout
          </button>
        </Link>
      </div>
    </>
  );
}