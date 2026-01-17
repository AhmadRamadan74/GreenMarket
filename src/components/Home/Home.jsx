import React, { useContext } from 'react'
import style from "./Home.module.css"
import RecentProducts from '../RecentProducts/RecentProducts'
import { UserContext } from '../../context/UserContext'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
export default function Home() {
    
    
    return (  
        <>
            <MainSlider/>
                <CategorySlider/>
            <RecentProducts/>
        </>
    )
}
