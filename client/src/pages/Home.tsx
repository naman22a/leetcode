import React from 'react';
import * as api from '../api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const meQuery = useQuery({
        queryKey: ['users', 'me'],
        queryFn: api.users.me
    });

    if (meQuery.isError || !meQuery.data) {
        navigate('/auth');
        return null;
    }

    if (meQuery.isLoading) return <p>Loading...</p>;

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold">Problems</h1>
        </div>
    );
};

export default Home;
