import { Github } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/button';

const Auth: React.FC = () => {
    return (
        <div className="pt-20 p-5 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold mb-5">Auth</h1>

            <a
                className="flex items-center gap-2"
                href={`${import.meta.env.VITE_API_ENDPOINT}/auth/github`}
            >
                <Button>
                    <Github />
                    Login with Github
                </Button>
            </a>
        </div>
    );
};

export default Auth;
