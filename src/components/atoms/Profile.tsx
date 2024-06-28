import { useEffect, useState } from 'react';
import type { User } from "@models/types";

function Profile() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') ?? "");
        setUser(user);
    }, []);

    if (!user) {
        return <div className='h-12'></div>;
    }


    return (
        <div className="flex flex-col gap-4 w-full">
            <picture className='flex gap-6 items-center'>
                <img src={user.photoUrl} className="w-12 h-12 rounded-full object-cover" />
                <p>{user.username}</p>
            </picture>
        </div>

    )
}

export default Profile