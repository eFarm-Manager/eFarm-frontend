import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupFarm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        farmName: '',
        activationCode: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
            return 'Phone number must be between 6 and 20 characters.';
        }
        if (formData.farmName.length < 6 || formData.farmName.length > 45) {
            return 'Farm name must be between 6 and 45 characters.';
        }
        if (formData.activationCode.length < 6 || formData.activationCode.length > 45) {
            return 'Activation code must be between 6 and 45 characters.';
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

        try {
            const response = await fetch('/api/auth/signupfarm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                await response.json();
                setResponseMessage('Registration successful!');
                navigate('/dashboard');
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
            <h2>Register Farm</h2>
            <form onSubmit={handleSubmit}>
                {/* Fields for farm registration */}
                <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} />
                <input type="text" name="farmName" placeholder="Farm Name" onChange={handleInputChange} />
                <input type="text" name="activationCode" placeholder="Activation Code" onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SignupFarm;
