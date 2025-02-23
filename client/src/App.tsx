import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProblemDetails from './pages/ProblemDetails';
import Header from './components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route
                            path="/problems/:id"
                            element={<ProblemDetails />}
                        />
                    </Routes>
                </BrowserRouter>
                <Toaster />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
