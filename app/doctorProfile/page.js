"use client"
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api2/doctors/profile"); // Adjust based on the user type
                if (!response.ok) throw new Error('Failed to fetch profile data');
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div>{error}</div>;
    if (!userData) return <div>Loading...</div>;

    return (
        <div className="mt-28">
            <h1 className="text-2xl">{userData.fullName}&apos;s Profile</h1>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            {/* Add other fields as necessary */}
        </div>
    );
};

export default ProfilePage;
