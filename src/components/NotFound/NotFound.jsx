import React from 'react'
import style from "./NotFound.module.css"
import notFound from '../../assets/images/error.svg'

export default function NotFound() {
    return (
        <>
            <img className='p-20 mx-auto' src={notFound} alt="Not Found" />
            <h2 className='text-center text-3xl font-bold text-gray-700'>404 - Page Not Found</h2>
        </>
    )
}