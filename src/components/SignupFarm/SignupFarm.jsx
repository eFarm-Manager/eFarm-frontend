import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignupFarm.css'; // Importujemy plik CSS

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

    useEffect(() => {
        document.title = 'Rejestracja farmy';
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (formData.firstName.length < 3 || formData.firstName.length > 30) {
            return 'Imię musi mieć od 3 do 30 znaków';
        }
        if (formData.lastName.length < 3 || formData.lastName.length > 40) {
            return 'Nazwisko musi mieć od 3 do 40 znaków';
        }
        if (formData.username.length < 6 || formData.username.length > 30) {
            return 'Nazwa użytkownika musi mieć od 6 do 30 znaków';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email) || formData.email.length > 50) {
            return 'Niepoprawny format adresu email';
        }
        if (formData.password.length < 6 || formData.password.length > 40) {
            return 'Hasło musi mieć od 6 do 40 znaków';
        }
        if (formData.phoneNumber && (formData.phoneNumber.length < 6 || formData.phoneNumber.length > 20)) {
            return 'Numer telefonu musi mieć od 6 do 12 znaków';
        }
        if (formData.farmName.length < 6 || formData.farmName.length > 45) {
            return 'Nazwa farmy musi mieć od 6 do 45 znaków';
        }
        if (formData.activationCode.length < 6 || formData.activationCode.length > 20) {
            return 'Kod aktywacyjny musi mieć od 6 do 20 znaków';
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
        <div className="signup-farm-container">
            <h2>Zarejestruj farmę</h2>
            <form onSubmit={handleSubmit} style={{width: '100%', maxWidth: '400px'}}>
                <div className="form-columns">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Imię"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nazwisko"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Nazwa użytkownika"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Hasło"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Numer telefonu"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="farmName"
                        placeholder="Nazwa farmy"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="activationCode"
                        placeholder="Kod aktywacyjny"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                    <button type="submit" className="submit-button">Zarejestruj</button>
                    <Link to="/">Powrót</Link>
            </form>
            {responseMessage && <p className="success-message">{responseMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default SignupFarm;
