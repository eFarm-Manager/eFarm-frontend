import { useState } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

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
                localStorage.setItem('jwtToken', data.token); // Zapisz token w localStorage
                alert('Login successful!');
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
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SignIn;
