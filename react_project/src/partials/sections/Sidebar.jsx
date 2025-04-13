import React from 'react';
import LogotypeLink from '../components/LogotypeLink';
import Navlinks from "./NavLinks";

const Sidebar = () => {
    return (
        <section className = "sidebar">
            <LogotypeLink />
            <Navlinks />
        </section>
    )
}

export default Sidebar