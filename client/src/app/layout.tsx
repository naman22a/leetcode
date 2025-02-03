import type { Metadata } from 'next';
import '../styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
    title: 'Leetcode'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
