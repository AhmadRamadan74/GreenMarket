import React, { useContext, useState, useEffect } from 'react'
import logo from '../../assets/GreenMarket.png'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { WishlistContext } from '../../context/WishlistContext'

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext)
  let { cart } = useContext(CartContext)
  let { wishList } = useContext(WishlistContext)

  let navigate = useNavigate()
  let location = useLocation()

  const isLoginPage = location.pathname === '/login'
  const isRegisterPage = location.pathname === '/register'

  // const {pathname} = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const [openMenu, setOpenMenu] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (openProfile && !event.target.closest('.profile-dropdown')) {
        setOpenProfile(false)
      }
      if (openMenu && !event.target.closest('.mobile-menu-container')) {
        setOpenMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openProfile, openMenu])

  function logOut() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    setOpenProfile(false)
    setOpenMenu(false)
    navigate('/login')
  }

  return (
    <header className="bg-neutral-900 fixed inset-x-0 top-0 z-50 capitalize">
      <nav className="flex items-center justify-around px-6 py-4 lg:px-8">

        <div className="flex items-center gap-2">
          <NavLink to="/">
            <img src={logo} alt="FreshCart" className="w-42" />
          </NavLink>
        </div>
        {userToken && !isLoginPage && !isRegisterPage && (
          <ul className="hidden lg:flex gap-x-6 text-white font-medium text-bold">
            <li><NavLink to="/" className="hover:text-green-500 transition">Home</NavLink></li>
            <li><NavLink to="/products" className="hover:text-green-500 transition">Products</NavLink></li>
            <li><NavLink to="/categories" className="hover:text-green-500 transition">Categories</NavLink></li>
            <li><NavLink to="/brands" className="hover:text-green-500 transition">Brands</NavLink></li>
          </ul>
        )}

        {userToken && !isLoginPage && !isRegisterPage && (
          <div className="hidden lg:flex items-center gap-6">

            <div className="flex items-center gap-3 text-gray-400 border-r border-gray-700 pr-4">
              <a href="https://www.facebook.com/amdoka99" className='hover:!text-green-600 transition' target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/RMDN7_7" target="_blank" className='hover:!text-green-600 transition' rel="noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/7mbolah/" className='hover:!text-green-600 transition' target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/ahmad-elemam-dev/" className='hover:!text-green-600 transition' target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>

            <NavLink to="/wishlist" className="group relative text-white">
              <i className="fas fa-heart fa-lg group-hover:text-orange-500 transition"></i>
              {wishList?.count > 0 && (
                <span className="absolute group-hover:bg-orange-500 transition -top-3 left-3 bg-white text-[#222] font-bold text-sm w-4 h-4 p-[10px] flex justify-center items-center rounded-full">
                  {wishList.count}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart" className="group relative text-white group-hover">
              <i className="fas fa-shopping-cart fa-lg group-hover:text-orange-600 transition"></i>
              {cart?.numOfCartItems > 0 && (
                <span className="absolute group-hover:bg-orange-600 transition -top-3 left-3 bg-white text-[#222] font-bold text-sm w-4 h-4 p-[10px] flex justify-center items-center rounded-full">
                  {cart.numOfCartItems}
                </span>
              )}
            </NavLink>

            <div className="relative profile-dropdown">
              <button onClick={() => setOpenProfile(!openProfile)} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition">
                <i className="fa-solid fa-user text-xl"></i>
              </button>

              {openProfile && (
                <div className="absolute right-0 z-10 mt-2 w-52 text-blue-950 rounded-md bg-white shadow-lg px-5 py-2 duration-500 text-left">
                  <p className="text-center text-xl font-bold duration-500 mb-3">Rmdn</p>
                  <NavLink to="/allorders" onClick={() => setOpenProfile(false)} className="block text-sm font-bold hover:text-green-600 duration-500 mb-3 ms-4">Your Orders</NavLink>
                  <NavLink to="/useraddress" onClick={() => setOpenProfile(false)} className="block text-sm font-bold hover:text-green-600 duration-500 mb-3 ms-4">User Address</NavLink>
                  <NavLink to="/updateprofile" onClick={() => setOpenProfile(false)} className="block text-sm font-bold hover:text-green-600 duration-500 mb-3 ms-4">Update Profile</NavLink>
                  <NavLink to="/updatepassword" onClick={() => setOpenProfile(false)} className="block text-sm font-bold hover:text-green-600 duration-500 mb-3 ms-4">Update Password</NavLink>
                  <div className="border-t border-gray-300 mt-2 pt-2">
                    <button onClick={logOut} className="block font-bold !bg-white !text-red-800 hover:!text-red-800 duration-500 text-sm">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isLoginPage && (
          <NavLink to="/login" className="text-white font-medium">
            Login
          </NavLink>
        )}

        {isRegisterPage && (
          <NavLink to="/register" className="text-white font-medium">
            Register
          </NavLink>
        )}

        {!userToken && !isLoginPage && !isRegisterPage && (
          <>
            <NavLink to="/login" className="font-medium text-green-500 transition">Login</NavLink>
            <NavLink to="/register" className="font-medium text-green-500 transition">Register</NavLink>
          </>
        )}

        {userToken && !isLoginPage && !isRegisterPage && (
          <div className="mobile-menu-container lg:hidden">
            <button className="text-white text-2xl" onClick={() => setOpenMenu(!openMenu)}>
              <i className={openMenu ? "fas fa-times" : "fas fa-bars"}></i>
            </button>

            {openMenu && (
              <div className="absolute right-6 top-16 z-10 w-64 bg-white rounded-lg shadow-xl py-4">
                
                <div className="px-4 mb-4">
                  <NavLink to="/" onClick={() => setOpenMenu(false)} className="block py-2 text-gray-800 hover:text-green-600 font-medium">
                    Home
                  </NavLink>
                  <NavLink to="/products" onClick={() => setOpenMenu(false)} className="block py-2 text-gray-800 hover:text-green-600 font-medium">
                    Products
                  </NavLink>
                  <NavLink to="/categories" onClick={() => setOpenMenu(false)} className="block py-2 text-gray-800 hover:text-green-600 font-medium">
                    Categories
                  </NavLink>
                  <NavLink to="/brands" onClick={() => setOpenMenu(false)} className="block py-2 text-gray-800 hover:text-green-600 font-medium">
                    Brands
                  </NavLink>
                </div>

                <hr className="my-2" />

                <div className="px-4 mb-4">
                  <NavLink to="/wishlist" onClick={() => setOpenMenu(false)} className="flex items-center justify-between py-2 text-gray-800 hover:text-orange-500 font-medium">
                    <span><i className="fas fa-heart mr-2"></i>Wishlist</span>
                    {wishList?.count > 0 && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {wishList.count}
                      </span>
                    )}
                  </NavLink>
                  <NavLink to="/cart" onClick={() => setOpenMenu(false)} className="flex items-center justify-between py-2 text-gray-800 hover:text-orange-600 font-medium">
                    <span><i className="fas fa-shopping-cart mr-2"></i>Cart</span>
                    {cart?.numOfCartItems > 0 && (
                      <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {cart.numOfCartItems}
                      </span>
                    )}
                  </NavLink>
                </div>

                <hr className="my-2" />

                <div className="px-4 mb-4">
                  <p className="text-gray-800 font-bold mb-2">Account</p>
                  <NavLink to="/allorders" onClick={() => setOpenMenu(false)} className="block py-2 text-sm text-gray-700 hover:text-green-600">
                    Your Orders
                  </NavLink>
                  <NavLink to="/useraddress" onClick={() => setOpenMenu(false)} className="block py-2 text-sm text-gray-700 hover:text-green-600">
                    User Address
                  </NavLink>
                  <NavLink to="/updateprofile" onClick={() => setOpenMenu(false)} className="block py-2 text-sm text-gray-700 hover:text-green-600">
                    Update Profile
                  </NavLink>
                  <NavLink to="/updatepassword" onClick={() => setOpenMenu(false)} className="block py-2 text-sm text-gray-700 hover:text-green-600">
                    Update Password
                  </NavLink>
                </div>

                <hr className="my-2" />

                <div className="px-4 mb-4">
                  <p className="text-gray-800 font-bold mb-2">Follow Us</p>
                  <div className="flex gap-4 text-gray-600">
                    <a href="https://www.facebook.com/amdoka99" className='hover:text-green-600 transition text-xl' target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://x.com/RMDN7_7" target="_blank" className='hover:text-green-600 transition text-xl' rel="noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com/7mbolah/" className='hover:text-green-600 transition text-xl' target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/ahmad-elemam-dev/" className='hover:text-green-600 transition text-xl' target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>

                <hr className="my-2" />

                <div className="px-4">
                  <button onClick={logOut} className="w-full text-left text-red-600 hover:text-red-800 font-bold py-2">
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </nav>
    </header>
  )
}