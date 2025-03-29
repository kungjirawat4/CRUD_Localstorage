
import React from 'react';
import ThemeSwitcher from './theme/page';
import LocaleSwitcher from './LocaleSwitcher';

const Navbar: React.FC = () => {
    return (
        <div className="navbar  shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">CRUD Form</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex items-center justify-end">
                    <li> <ThemeSwitcher /></li>
                    <li>  <LocaleSwitcher /></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
