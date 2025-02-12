import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, redirect } from 'react-router-dom';
import * as api from '@/api';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';

const Header: React.FC = () => {
    const client = useQueryClient();

    const meQuery = useQuery({
        queryKey: ['users', 'me'],
        queryFn: api.users.me
    });

    const logoutMutation = useMutation({
        mutationKey: ['auth', 'logout'],
        mutationFn: api.auth.logout
    });

    const handleLogout = async () => {
        try {
            const res = await logoutMutation.mutateAsync();
            if (res.ok && !res.errors) {
                client.invalidateQueries({ queryKey: ['users', 'me'] });
                redirect('/auth');
                return;
            }
            alert('Something went wrong');
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <header className="flex justify-between items-center px-10 py-5 shadow">
            <Link to="/" className="flex items-center gap-2">
                <img src="/leetcode.svg" alt="Leetcode" className="h-10 w-10" />
                <h1 className="text-xl font-semibold">Leetcode</h1>
            </Link>
            <nav className="flex gap-2 items-center">
                {meQuery.isLoading || meQuery.isError || !meQuery.data ? (
                    <a
                        href={`${import.meta.env.VITE_API_ENDPOINT}/auth/github`}
                    >
                        <Button>Sign in</Button>
                    </a>
                ) : (
                    <div className="flex items-center gap-2">
                        <h1>{meQuery.data.username}</h1>
                        <Button
                            className="cursor-pointer"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Button>
                    </div>
                )}
                <ModeToggle />
            </nav>
        </header>
    );
};

export default Header;
