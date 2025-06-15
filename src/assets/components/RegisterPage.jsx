import React, { useState } from 'react';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    country: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = [
    'Benin', 'Togo','Côte Ivoire', 'Canada', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy',
    'Australia', 'Japan', 'South Korea', 'Brazil', 'Mexico', 'Argentina', 'India',
    'China', 'Russia', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères');
      return;
    }

    if (parseInt(formData.age) < 5) {
      setError('Vous devez avoir au moins 5 ans pour vous inscrire');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        country: formData.country,
      });

      console.log('Registration response:', response.data);
      alert('Inscription réussie ! Bienvenue sur KaraArema !');
      navigate('/login', { replace: true });
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('L nscription a échoué. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate('/formuse');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <StyledWrapper>
      <div className="background">
        <div className="form">
          <div className="title"> Enregistrez-Vous</div>
          <div className="subtitle">Créez votre compte et commencez votre aventure musicale avec nous</div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-container ic1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  id="firstname"
                  required
                />
                <div className="cut" />
                <label className="iLabel" htmlFor="firstname">Prénom</label >
              </div>

              <div className="input-container ic1">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  id="lastname"
                  required
                />
                <div className="cut" />
                <label className="iLabel" htmlFor="lastname">Nom</label>
              </div>
            </div>

            <div className="input-container ic2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                id="email"
                required
              />
              <div className="cut cut-short" />
              <label className="iLabel" htmlFor="email">Email</label>
            </div>

            <div className="row">
              <div className="input-container ic2">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input"
                  id="age"
                  min="13"
                  required
                />
                <div className="cut" />
                <label className="iLabel" htmlFor="age">Age</label>
              </div>

              <div className="input-container ic2">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input select-input"
                  id="country"
                  required
                >
                  <option value=""></option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="cut" />
                <label className="iLabel" htmlFor="country">Pays</label>
              </div>
            </div>

            <div className="input-container ic2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input password-input"
                id="password"
                required
              />
              <div className="cut" />
              <label className="iLabel" htmlFor="password">Mot de passe</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="input-container ic2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input password-input"
                id="confirmPassword"
                required
              />
              <div className="cut cut-long" />
              <label className="iLabel" htmlFor="confirmPassword">Confirmation Mot de passe</label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="submit" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Créer un compte'}
            </button>
          </form>

          <div className="footer-links">
            <p className="signin-link">
              Vous avez déjà un compte ?{' '}
              <button onClick={handleSignInClick} className="link-button">
                Connectez-vous ici
              </button>
            </p>
            <button onClick={handleBackToHome} className="back-link">
              ←   Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .background {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg,rgb(90, 98, 132) 0%,rgb(124, 112, 136) 100%);
    padding: 20px;
  }

  .form {
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 30px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 20px 40px rgba(224, 205, 205, 0.3);
  }

  .title {
    color: #eee;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  }

  .subtitle {
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 30px;
    text-align: center;
    opacity: 0.8;
  }

  .error-message {
    background-color: rgba(220, 47, 85, 0.2);
    border: 1px solid rgba(220, 47, 85, 0.5);
    color:rgb(187, 175, 177);
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 14px;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  .input-container {
    height: 50px;
    position: relative;
    width: 100%;
  }

  .ic1 {
    margin-top: 0;
  }

  .ic2 {
    margin-top: 30px;
  }

  .input {
    background-color:rgb(196, 197, 206);
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
    transition: all 200ms ease;
  }

  .select-input {
    padding-top: 8px;
    
    option {
      background-color:rgb(189, 191, 201);
      color: #eee;
    }
  }

  .password-input {
    padding-right: 50px;
  }

  .password-toggle {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #65657b;
    cursor: pointer;
    transition: color 200ms ease;
    
    &:hover {
      color:rgb(168, 156, 159);
    }
  }

  .cut {
    background-color: #15172b;
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 76px;
  }

  .cut-short {
    width: 50px;
  }

  .cut-long {
    width: 120px;
  }

  .iLabel {
    color: #65657b;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
    font-size: 14px;
  }

  .input:focus ~ .cut {
    transform: translateY(8px);
  }

  .input:focus ~ .iLabel,
  .input:not(:placeholder-shown) ~ .iLabel {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  .input:not(:focus) ~ .iLabel {
    color: #808097;
  }

  .input:focus ~ .iLabel {
    color:rgb(218, 198, 202);
  }

  .input:not(:placeholder-shown):not(:focus) ~ .iLabel {
    color:rgb(237, 235, 235);
  }

  .submit {
    background: linear-gradient(135deg,rgba(130, 134, 151, 0.8) 0%, #764ba2 100%);
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    height: 50px;
    margin-top: 38px;
    text-align: center;
    width: 100%;
    transition: all 200ms ease;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(23, 23, 24, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .footer-links {
    margin-top: 30px;
    text-align: center;
  }

  .signin-link {
    color: #eee;
    font-family: sans-serif;
    font-size: 14px;
    margin-bottom: 15px;
    opacity: 0.8;
  }

  .link-button {
    background: none;
    border: none;
    color: #dc2f55;
    text-decoration: underline;
    cursor: pointer;
    font-size: 14px;
    transition: color 200ms ease;
    
    &:hover {
      color: #ff4d7d;
    }
  }

  .back-link {
    background: none;
    border: none;
    color: #65657b;
    text-decoration: underline;
    cursor: pointer;
    font-size: 12px;
    transition: color 200ms ease;
    
    &:hover {
      color: #808097;
    }
  }
`;

export default RegisterPage;