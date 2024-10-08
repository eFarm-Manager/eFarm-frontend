import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const UpdateActivationCode = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        newActivationCode: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const roles = sessionStorage.getItem('roles');
        if (username && roles) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            let response;
            if (isLoggedIn) {
                response = await fetch('/api/auth/update-activation-code', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: formData.password,
                        newActivationCode: formData.newActivationCode
                    }),
                    credentials: 'include'
                });
            } else {
                response = await fetch('/api/auth/update-activation-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                        newActivationCode: formData.newActivationCode
                    })
                });
            }


            if (response.ok) {
                setSuccessMessage('Activation code updated successfully.');

                // Clear expireCodeInfo from sessionStorage
                sessionStorage.removeItem('expireCodeInfo');

                // Do not navigate immediately; provide options
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to update activation code.');
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    const handleReturn = () => {
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <div>
            <h2>Update Activation Code</h2>
            {!successMessage ? (
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                <input type="text" name="newActivationCode" placeholder="New Activation Code" onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            ) : (
                <div>
                    <p style={{ color: 'green' }}>{successMessage}</p>
                    <button onClick={handleReturn}>
                        {isLoggedIn ? 'Return to Dashboard' : 'Go to Sign In'}
                    </button>
                </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default UpdateActivationCode;
