import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';

const NewActivationCode = ({ onLogout, onExpireCodeInfoUpdate }) => {
    const [formData, setFormData] = useState({
        password: '',
        newActivationCode: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('roles');
        const username = sessionStorage.getItem('username');

        setUsername(username);

        if (!username || !storedRoles) {
            navigate('/sign-in');
            return;
        }

        const roles = JSON.parse(storedRoles);

        if (roles.includes('ROLE_FARM_MANAGER') || roles.includes('ROLE_FARM_OWNER')) {
            setUserRole('MANAGER_OR_OWNER');
        } else {
            setUserRole('OTHER_ROLE');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.password.trim()) {
            return 'Password is required.';
        }
        if (!formData.newActivationCode.trim()) {
            return 'New Activation Code is required.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const response = await fetch('/api/auth/update-activation-code', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    password: formData.password,
                    newActivationCode: formData.newActivationCode,
                }),
            });

            if (response.ok) {
                setSuccessMessage('Activation code updated successfully.');
                onExpireCodeInfoUpdate(null);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to update activation code.');
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar onLogout={onLogout} userRole={userRole} username={username} />
            <div style={{ padding: '20px' }}>
                <h2>New Activation Code</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>New Activation Code:</label>
                        <input
                            type="text"
                            name="newActivationCode"
                            value={formData.newActivationCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

NewActivationCode.propTypes = {
    onLogout: PropTypes.func.isRequired,
    onExpireCodeInfoUpdate: PropTypes.func.isRequired,
};

export default NewActivationCode;
