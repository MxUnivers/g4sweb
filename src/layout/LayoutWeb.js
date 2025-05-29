import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterWeb from '../components/web/FooterWeb'

const LayoutWeb = () => {
    return (
        <>
            <Outlet />
            <FooterWeb />
        </>
    )
}

export default LayoutWeb
