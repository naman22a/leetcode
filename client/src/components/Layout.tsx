'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';

interface Props {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </QueryClientProvider>
        </div>
    );
};

export default Layout;
