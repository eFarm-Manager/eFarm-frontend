import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { setCookie } from '../helpers/cookieHelper';

const SignIn = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [expireCodeInfo, setExpireCodeInfo] = useState('');
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
                if (data.expireCodeInfo) {
                    setExpireCodeInfo(data.expireCodeInfo);
                }
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('roles', JSON.stringify(data.roles));

                alert('Login successful!');
                onLogin();  // No need to pass token
                navigate('/dashboard');
            } else if (response.status === 403) {
                // Obsługa przekierowania do aktualizacji kodu aktywacyjnego dla ROLE_FARM_OWNER
                const location = response.headers.get('location');
                if (location) {
                    navigate(`/update-activation-code?redirect=${encodeURIComponent(location)}`);
                } else {
                    setErrorMessage('Your farm has expired, and you need to update the activation code.');
                }
            } else if (response.status === 401) {
                // Obsługa błędu 401 dla ROLE_FARM_MANAGER oraz ROLE_FARM_EQUIPMENT_OPERATOR
                const data = await response.json();
                setErrorMessage(data.message || 'Your farm has been blocked.');
            } else {
                setErrorMessage('Invalid login credentials.');
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
            {expireCodeInfo && <p style={{ color: 'orange' }}>{expireCodeInfo}</p>}
        </div>
    );
};

SignIn.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default SignIn;
