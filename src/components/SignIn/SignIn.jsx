import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import './SignIn.css'; // Importujemy plik CSS

const SignIn = () => {
    const { handleLogin } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Logowanie';
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            return 'Nazwa użytkownika jest wymagana';
        }
        if (!formData.password.trim()) {
            return 'Hasło jest wymagane';
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

            const data = await response.json();

            if (response.status === 403) {
                const message = data.message || '';
                if (message.includes('Gospodarstwo jest nieaktywne. Podaj nowy kod aktywacyjny.')) {
                    setErrorMessage(message);
                    setTimeout(() => {
                        navigate('/update-activation-code');
                    }, 2000);
                } else if (message.includes('Gospodarstwo jest nieaktywne. Kod aktywacyjny wygasł.')) {
                    setErrorMessage(message);
                    sessionStorage.clear();
                } else {
                    setErrorMessage(message || 'Odmowa dostępu');
                    sessionStorage.clear();
                }
            } else if (response.ok) {
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('roles', JSON.stringify(data.roles));
                const expireCodeInfo = data.expireCodeInfo || null;
                sessionStorage.setItem('expireCodeInfo', expireCodeInfo);
                handleLogin(expireCodeInfo);
                navigate('/dashboard');
            } else {
                setErrorMessage(data.message || 'Nieprawidłowe dane logowania');
            }
        } catch (error) {
            setErrorMessage(`Błąd: ${error.message}`);
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Zaloguj się</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nazwa użytkownika"
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
                <button type="submit" className="submit-button">Zaloguj</button>
                <Link to="/">Powrót</Link>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default SignIn;
