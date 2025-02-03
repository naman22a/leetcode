'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '../hooks/use-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Home() {
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/me`,
                    { withCredentials: true }
                );

                if (!res.data) {
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
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`,
                {},
                { withCredentials: true }
            );

            if (res.data.ok) {
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
