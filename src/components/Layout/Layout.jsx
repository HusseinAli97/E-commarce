import styles from './Layout.module.css'
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
export default function Layout() {
    const userToken = localStorage.getItem("userToken")
    return (
        <>
            <div className="container-fluid shadow-lg navBg fixed-top ">
                <TopBar />
                <NavBar />
            </div>
            <Outlet />
            <Footer />
        </>
    )
}
