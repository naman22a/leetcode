import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProblemDetails from './pages/ProblemDetails';
import Profile from './pages/Profile';

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
                        <Route path="/u/:username" element={<Profile />} />
                    </Routes>
                </BrowserRouter>
                <Toaster reverseOrder />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
