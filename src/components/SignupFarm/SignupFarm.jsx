import { useState } from 'react';

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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');  // Reset message before submission
        setErrorMessage('');

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
                setResponseMessage('Registration successful!');  // Success feedback
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
