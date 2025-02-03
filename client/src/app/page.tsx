'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '@/api';

function Home() {
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            try {
                const user = await api.users.me();

                if (!user) {
                    toast({
                        title: 'Unauthorized',
                        variant: 'destructive'
                    });
                    router.push('/auth');
                }
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Unauthorized',
                    variant: 'destructive'
                });
                router.push('/auth');
            }
        })();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await api.auth.logout();

            if (res.ok) {
                toast({
                    title: 'Logged out'
                });
                router.push('/auth');
            } else {
                toast({
                    title: 'Something went wrong',
                    variant: 'destructive'
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="p-5">
            <h1 className="font-semibold text-3xl mb-5">Leetcode dashboard</h1>
            <Button onClick={() => handleLogout()}>Logout</Button>
        </div>
    );
}

export default Home;
