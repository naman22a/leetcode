import React from 'react';
import { useParams } from 'react-router-dom';
import { ActivityCalendar } from 'react-activity-calendar';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { mapSubmissions } from '../utils';
import { useTheme } from '../components/theme-provider';

const Profile: React.FC = () => {
    const { theme } = useTheme();
    const { username } = useParams();
    const userQuery = useQuery({
        queryKey: ['users', username],
        queryFn: () => api.users.byUsername(username!)
    });

    if (userQuery.isLoading || userQuery.isError) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col lg:flex-row items-center gap-5 p-5">
            <div className="lg:w-1/3">
                <h1 className="font-bold text-5xl mb-5">{username}</h1>
                <p>{userQuery.data!.bio}</p>
            </div>
            <ActivityCalendar
                data={mapSubmissions(userQuery.data!.submissions)}
                colorScheme={theme === 'light' ? 'light' : 'dark'}
                theme={{
                    light: ['#eee', '#2ecc71'],
                    dark: ['#383838', '#2ecc71']
                }}
                blockMargin={4}
                blockRadius={2}
                blockSize={12}
                fontSize={14}
                loading={userQuery.isLoading || userQuery.isError}
                maxLevel={4}
                weekStart={0}
            />
        </div>
    );
};

export default Profile;
