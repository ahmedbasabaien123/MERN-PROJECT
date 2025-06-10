import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useState } from 'react';

const Log = () => {
    const [ signInModal, setSignInModal ] = useState(true);
    const [ signUpModal, setSignUpModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignUpModal(true);
            setSignInModal(false);
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className="connection-form">
            <div className="form-contanier">
                <ul>
                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire
                        </li>
                        <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                        </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
        </div>
        </div>
    );
};

export default Log;