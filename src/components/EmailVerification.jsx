import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationToken, setVerificationToken] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        console.log(token);

        if(token) {
            setVerificationToken(token);

            axios.post(`${import.meta.env.VITE_API_URL}/verify-email`, { token })
                .then(response => {
                    setVerificationStatus(response.data.status);
                    if(response.data.status === 'success' && response.data.token) {
                        localStorage.setItem('token', response.data.token);
                    }
                })
                .catch(error=> {
                    console.log(error.response.data.message);
                });
        }
    }, [location.search, navigate]);

    const handleGotToHomePage = () => {
        navigate('/login');
    }

    const handleResendEmail = () => {
        console.log("Code Is Remaining");
    }
    return (
        <div>
            <h1>Email Verification</h1>
            {verificationStatus === 'success' && (
                <>
                    <p>Email verified successfully!</p>
                    <p><button onClick={handleGotToHomePage} className='btn btn-primary'>Login</button></p>
                </>
            )}
            {verificationStatus === 'error' && (
                <>
                    <p>Email verification failed.  Please try again or contact support.</p>
                    <p><button onClick={handleResendEmail} className='btn btn-primary'>Resend Email</button></p>
                </>
            )}
            {verificationStatus === '' && (
                <p>Verifying your email...</p>
            )}
        </div>
    )
}

export default EmailVerification;