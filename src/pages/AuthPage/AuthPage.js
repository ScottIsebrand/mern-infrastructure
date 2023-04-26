import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LogInForm/LogInForm';
import Logo from '../../components/Logo/Logo';
import styles from './AuthPage.module.css';

function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className={styles.AuthPage}>
      <h1>Auth Page</h1>
      <Logo />
      <h3 onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Sign up' : 'Log in'}
      </h3>

      {showLogin ? (
        <LoginForm setUser={setUser} />
      ) : (
        <SignUpForm setUser={setUser} />
      )}
    </main>
  );
}

export default AuthPage;
