import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignIn = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    //const [expireCodeInfo, setExpireCodeInfo] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            return 'Username is required.';
        }
        if (!formData.password.trim()) {
            return 'Password is required.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();

                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('roles', JSON.stringify(data.roles));

                if (data.expireCodeInfo) {
                    sessionStorage.setItem('expireCodeInfo', data.expireCodeInfo);
                } else {
                    sessionStorage.removeItem('expireCodeInfo');
                }

                const roles = data.roles;
                const locationHeader = response.headers.get('location');

                if (locationHeader) {
                    // Farm has expired
                    if (roles.includes('ROLE_FARM_OWNER')) {
                        // Redirect to UpdateActivationCode
                        navigate('/update-activation-code');
                    } else if (
                        roles.includes('ROLE_FARM_MANAGER') ||
                        roles.includes('ROLE_FARM_EQUIPMENT_OPERATOR')
                    ) {
                        // Display error message
                        setErrorMessage('Your farm has been blocked.');
                        // Clear stored data
                        sessionStorage.clear();
                    }
                } else {
                    // Farm is active, proceed to dashboard
                    onLogin();
                    navigate('/dashboard');
                }
            } else {
                // Handle other non-OK responses (e.g., invalid credentials)
                setErrorMessage(data.message || 'Invalid login credentials.');
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

SignIn.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default SignIn;
