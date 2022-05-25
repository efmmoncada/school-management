import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = ({ title }) => {
    return (
        <header className='header'>
            <h1 className='page_title'>{title}</h1>
            <nav className='nav'>
                <NavLink to='/' className='navlink'>
                    Home
                </NavLink>
                <NavLink to='/students' className='navlink'>
                    Students
                </NavLink>
                <NavLink to='/classes' className='navlink'>
                    Classes
                </NavLink>
                <NavLink to='/staff' className='navlink'>
                    Staff
                </NavLink>
                <NavLink to='/locations' className='navlink'>
                    Locations
                </NavLink>
                <NavLink to='/enrolled_in' className='navlink'>
                    Enrolled In
                </NavLink>
                <NavLink to='/hosts' className='navlink'>
                    Hosts In
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
