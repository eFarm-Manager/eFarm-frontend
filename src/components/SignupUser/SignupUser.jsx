import { useState } from 'react';

const SignupUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: 'ROLE_FARM_EQUIPMENT_OPERATOR', // Domyślna rola
        password: '',
        phoneNumber: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value
        });
    };

    const validateForm = () => {
        if (formData.firstName.length < 3 || formData.firstName.length > 30) {
            return 'First name must be between 3 and 30 characters.';
        }
        if (formData.lastName.length < 3 || formData.lastName.length > 40) {
            return 'Last name must be between 3 and 40 characters.';
        }
        if (formData.username.length < 3 || formData.username.length > 20) {
            return 'Username must be between 3 and 20 characters.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email) || formData.email.length > 50) {
            return 'Email must be a valid address and less than 50 characters.';
        }
        if (formData.password.length < 6 || formData.password.length > 40) {
            return 'Password must be between 6 and 40 characters.';
        }
        if (formData.phoneNumber && (formData.phoneNumber.length < 6 || formData.phoneNumber.length > 20)) {
            return 'Phone number must be between 6 and 20 characters if provided.';
        }
        const validRoles = ['ROLE_FARM_MANAGER', 'ROLE_FARM_EQUIPMENT_OPERATOR', 'ROLE_FARM_OWNER'];
        if (!validRoles.includes(formData.role)) {
            return 'Invalid role selected.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setErrorMessage('');

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        const token = localStorage.getItem('jwtToken');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                await response.json();
                setResponseMessage('User registration successful!');

                setTimeout(() => {
                    navigate('/sign-in');
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(`Error: ${errorData.message || 'Failed to register'}`);
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                {/* Fields for user registration */}
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number (optional)"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                <select name="role" value={formData.role} onChange={handleRoleChange}>
                    <option value="ROLE_FARM_EQUIPMENT_OPERATOR">Operator</option>
                    <option value="ROLE_FARM_MANAGER">Manager</option>
                    <option value="ROLE_FARM_OWNER">Właściciel</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SignupUser;
