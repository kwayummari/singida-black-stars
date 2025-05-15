"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { post } from '@/services/api';
import styles from '../../../styles/sideBar.module.scss';

const LoginSideBar = ({ toggleLoginSidebar }) => {
    const [view, setView] = useState('login'); // login, register, forgotPassword, resetCode
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Login form states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Register form states
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regNewsletterConsent, setRegNewsletterConsent] = useState(false);
    const [regMarketingConsent, setRegMarketingConsent] = useState(false);
    
    // Reset password states
    const [resetEmail, setResetEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [resetConfirmPassword, setResetConfirmPassword] = useState('');
    
    // Clear all form states
    const clearForms = () => {
        // Login form
        setLoginEmail('');
        setLoginPassword('');
        
        // Register form
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegFirstName('');
        setRegLastName('');
        setRegNewsletterConsent(false);
        setRegMarketingConsent(false);
        
        // Reset password
        setResetEmail('');
        setResetCode('');
        setResetPassword('');
        setResetConfirmPassword('');
        
        // Clear messages
        setError('');
        setSuccess('');
    };
    
    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const response = await post('/users/login.php', {
                email: loginEmail,
                password: loginPassword
            });
            
            if (response.status === 'success') {
                // Save token and user data in localStorage
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                setSuccess('Login successful! Redirecting...');
                
                // Redirect or update UI after successful login
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                setError(response.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // Validate passwords match
        if (regPassword !== regConfirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await post('/users/register.php', {
                email: regEmail,
                password: regPassword,
                confirm_password: regConfirmPassword,
                first_name: regFirstName,
                last_name: regLastName,
                newsletter: regNewsletterConsent,
                marketing: regMarketingConsent
            });
            
            if (response.status === 'success') {
                setSuccess('Registration successful! Please check your email to verify your account.');
                
                // Switch to login view after successful registration
                setTimeout(() => {
                    setView('login');
                    clearForms();
                }, 3000);
            } else {
                setError(response.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handle forgot password request
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const response = await post('/users/reset-password.php', {
                request_type: 'request',
                email: resetEmail
            });
            
            if (response.status === 'success') {
                setSuccess('If your email is registered, you will receive a password reset link shortly.');
                
                // Switch to reset code view after sending reset email
                setTimeout(() => {
                    setView('resetCode');
                }, 3000);
            } else {
                setError(response.message || 'Failed to request password reset. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Failed to request password reset. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handle password reset
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // Validate passwords match
        if (resetPassword !== resetConfirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await post('/users/reset-password.php', {
                request_type: 'reset',
                token: resetCode,
                password: resetPassword,
                confirm_password: resetConfirmPassword
            });
            
            if (response.status === 'success') {
                setSuccess('Your password has been reset successfully. You can now log in with your new password.');
                
                // Switch to login view after successful password reset
                setTimeout(() => {
                    setView('login');
                    clearForms();
                }, 3000);
            } else {
                setError(response.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };
    
    return (
        <div className={styles.loginSidebar} style={{ scrollBehavior: 'smooth', overflow: 'auto', height: '100%' }}>
            <div className={styles.loginHeader}>
                <div className={styles.headerContent}>
                    <h4 className={styles.title}>Singida Black Stars</h4>
                    <motion.button 
                        type="button" 
                        className="btn-close btn-close-white" 
                        onClick={toggleLoginSidebar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    ></motion.button>
                </div>
                <div className={styles.logoContainer}>
                    <img
                        src="/images/logo.png"
                        alt="Singida Black Stars Logo"
                        className={styles.sidebarLogo}
                    />
                </div>
            </div>
            
            {/* Alert Messages */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        className="alert alert-danger mx-3"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </motion.div>
                )}
                
                {success && (
                    <motion.div 
                        className="alert alert-success mx-3"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <i className="bi bi-check-circle-fill me-2"></i>
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Login View */}
            <AnimatePresence mode="wait">
                {view === 'login' && (
                    <motion.div
                        key="login"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-4 py-3"
                    >
                        <h5 className={styles.formTitle}>Login</h5>
                        <p className={styles.formDescription}>
                            Sign in to access exclusive Singida Black Stars content and benefits.
                        </p>
                        
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="loginEmail"
                                        placeholder="Your email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="loginPassword"
                                        placeholder="Your password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className={styles.forgotPasswordLink}
                                    onClick={() => {
                                        setView('forgotPassword');
                                        setError('');
                                        setSuccess('');
                                    }}
                                >
                                    Forgot your password?
                                </button>
                            </div>
                            
                            <div className="d-grid mb-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-success btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Sign In
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className={styles.formDivider}>
                            <span>Not registered yet?</span>
                        </div>
                        
                        <div className="d-grid mt-3">
                            <button 
                                type="button" 
                                className="btn btn-outline-success btn-lg"
                                onClick={() => {
                                    setView('register');
                                    setError('');
                                    setSuccess('');
                                }}
                            >
                                <i className="bi bi-person-plus me-2"></i>
                                Create New Account
                            </button>
                        </div>
                    </motion.div>
                )}
                
                {/* Register View */}
                {view === 'register' && (
                    <motion.div
                        key="register"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-4 py-3"
                    >
                        <h5 className={styles.formTitle}>Register</h5>
                        <p className={styles.formDescription}>
                            Join the Singida Black Stars family for free and get access to exclusive content and benefits.
                        </p>
                        
                        <form onSubmit={handleRegister}>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label htmlFor="regFirstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="regFirstName"
                                        placeholder="Your first name"
                                        value={regFirstName}
                                        onChange={(e) => setRegFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="regLastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="regLastName"
                                        placeholder="Your last name"
                                        value={regLastName}
                                        onChange={(e) => setRegLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="regEmail" className="form-label">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="regEmail"
                                        placeholder="Your email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="regPassword" className="form-label">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="regPassword"
                                        placeholder="Choose a password"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        required
                                        minLength="8"
                                    />
                                </div>
                                <small className="form-text text-muted">Password must be at least 8 characters long.</small>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="regConfirmPassword" className="form-label">Confirm Password</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="regConfirmPassword"
                                        placeholder="Confirm your password"
                                        value={regConfirmPassword}
                                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="regNewsletterConsent"
                                        checked={regNewsletterConsent}
                                        onChange={(e) => setRegNewsletterConsent(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="regNewsletterConsent">
                                        Subscribe to our newsletter
                                    </label>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="regMarketingConsent"
                                        checked={regMarketingConsent}
                                        onChange={(e) => setRegMarketingConsent(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="regMarketingConsent">
                                        I agree to receive marketing communications
                                    </label>
                                </div>
                            </div>
                            
                            <div className="d-grid mb-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-success btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-person-plus-fill me-2"></i>
                                            Create Account
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className={styles.formDivider}>
                            <span>Already have an account?</span>
                        </div>
                        
                        <div className="d-grid mt-3">
                            <button 
                                type="button" 
                                className="btn btn-outline-success btn-lg"
                                onClick={() => {
                                    setView('login');
                                    setError('');
                                    setSuccess('');
                                }}
                            >
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Sign In
                            </button>
                        </div>
                    </motion.div>
                )}
                
                {/* Forgot Password View */}
                {view === 'forgotPassword' && (
                    <motion.div
                        key="forgotPassword"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-4 py-3"
                    >
                        <h5 className={styles.formTitle}>Reset Password</h5>
                        <p className={styles.formDescription}>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        
                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-4">
                                <label htmlFor="resetEmail" className="form-label">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="resetEmail"
                                        placeholder="Your registered email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="d-grid mb-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-success btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Sending Reset Link...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-envelope-fill me-2"></i>
                                            Send Reset Link
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className="d-grid mt-3">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    setView('login');
                                    setError('');
                                    setSuccess('');
                                }}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Login
                            </button>
                        </div>
                        
                        <div className="mt-3 text-center">
                            <button 
                                type="button" 
                                className={styles.resetCodeLink}
                                onClick={() => {
                                    setView('resetCode');
                                    setError('');
                                    setSuccess('');
                                }}
                            >
                                Already have a reset code?
                            </button>
                        </div>
                    </motion.div>
                )}
                
                {/* Reset Code View */}
                {view === 'resetCode' && (
                    <motion.div
                        key="resetCode"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-4 py-3"
                    >
                        <h5 className={styles.formTitle}>Enter Reset Code</h5>
                        <p className={styles.formDescription}>
                            Enter the reset code from the email we sent you, along with your new password.
                        </p>
                        
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-3">
                                <label htmlFor="resetCode" className="form-label">Reset Code</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-key"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="resetCode"
                                        placeholder="Enter the code from the email"
                                        value={resetCode}
                                        onChange={(e) => setResetCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        placeholder="Choose a new password"
                                        value={resetPassword}
                                        onChange={(e) => setResetPassword(e.target.value)}
                                        required
                                        minLength="8"
                                    />
                                </div>
                                <small className="form-text text-muted">Password must be at least 8 characters long.</small>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmNewPassword"
                                        placeholder="Confirm your new password"
                                        value={resetConfirmPassword}
                                        onChange={(e) => setResetConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="d-grid mb-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-success btn-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Resetting Password...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Reset Password
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        <div className="d-grid mt-3">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    setView('login');
                                    setError('');
                                    setSuccess('');
                                }}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Login
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoginSideBar;