import React from 'react';
import Header from '../Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Header />
                {children}
            </QueryClientProvider>
        </div>
    );
};

export default Layout;
