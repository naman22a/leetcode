import React from 'react';

const Auth: React.FC = () => {
    return (
        <div className="p-5">
            <h1>Auth</h1>
            <a href={`${import.meta.env.VITE_API_ENDPOINT}/auth/github`}>
                Login with github
            </a>
        </div>
    );
};

export default Auth;
