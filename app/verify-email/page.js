"use client"; // This ensures the page is a client-side component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing from next/navigation for client-side routing

const VerifyEmail = () => {
    const router = useRouter();
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (token && type) {
            const verifyEmail = async () => {
                try {
                    const response = await fetch(`/api2/verify-email?token=${token}&type=${type}`, {
                        method: 'GET',
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully!`);
                        const redirectPath = type === 'doctor' ? '/choice/doctorLogin' : '/choice/patientLogin' ;
                        setTimeout(() => router.push(redirectPath), 2000); // Redirect to login page after 2 seconds
                    } else {
                        setMessage(data.error || 'Verification failed.');
                    }
                } catch (error) {
                    setMessage('An error occurred. Please try again.');
                }
            };

            verifyEmail();
        } else {
            setMessage('Invalid verification link.');
        }
    }, [router]);

    return (
        <div>
            <h1 className='mt-32 text-2xl'>{message}</h1>
        </div>
    );
};

export default VerifyEmail;
