import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center px-10 py-5 shadow">
            <Link to="/" className="flex items-center gap-2">
                <img src="/leetcode.svg" alt="Leetcode" className="h-10 w-10" />
                <h1 className="text-xl font-semibold">Leetcode</h1>
            </Link>
            <nav>
                <Link to="/auth">Sign in</Link>
                {/* // TODO: toggle theme button */}
            </nav>
        </header>
    );
};

export default Header;
