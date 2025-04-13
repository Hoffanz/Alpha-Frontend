import React from 'react';
import NavLinkItem from '../components/NavLinkItem';
import {  useAuth  } from '../../contexts/AuthContext'

const Navlinks = () => {
    const {auth} = useAuth()

    return (
        <nav className = "nav-links">
            <NavLinkItem to = "/admin/projects" text = "Projects" iconClass="fa-duotone fa-solid fa-breifcase" />

            {auth.role === "admin" && (
                <>
                <NavLinkItem to = "/admin/members" text = "Members" iconClass = "fa-duotone fa-solid fa-user-group" />
                <NavLinkItem to = "admin/clients" text = "Clients" iconClass = "fa-duotone fa-solid fa-handshake" />
                </>
            )}

        </nav>
    )
}

export default Navlinks