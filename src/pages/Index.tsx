import React from 'react';
import LoginLayout from '@/components/layout/LoginLayout';
import LoginForm from '@/components/Login/LoginForm';

// Define the type for the login form data, matching what LoginForm provides
// In LoginForm.tsx, this is `LoginFormValues = z.infer<typeof formSchema>`
// formSchema defines username (string) and password (string)
interface LoginFormData {
  username: string;
  password: string;
}

/**
 * LoginPage serves as the main view for user authentication.
 * It utilizes AuthLayout (implemented as LoginLayout) for overall page structure
 * and embeds the LoginForm component for handling user input and submission.
 * This page also defines handlers for login success and sign-up requests,
 * which would typically trigger navigation or global state updates in a full application.
 */
const LoginPage: React.FC = () => {
  /**
   * Handles successful login attempts.
   * @param data - The validated login form data containing username and password.
   */
  const handleLoginSuccess = (data: LoginFormData) => {
    console.log('Login successful on page:', data);
    // In a real-world application, this would likely involve:
    // - Storing authentication tokens (e.g., in localStorage or context)
    // - Updating global application state (e.g., user profile)
    // - Navigating to a protected area of the application (e.g., a dashboard)
    // For this UI demonstration, an alert is used.
    alert(`Welcome, ${data.username}! Login successful.`);
  };

  /**
   * Handles clicks on the sign-up link or button.
   */
  const handleSignUpClick = () => {
    console.log('Sign up clicked on page.');
    // In a real-world application, this would typically navigate to a registration page
    // or open a sign-up modal.
    // For this UI demonstration, an alert is used.
    alert('Redirecting to Sign Up page (functionality not implemented).');
  };

  return (
    <LoginLayout>
      <LoginForm
        onLoginSuccess={handleLoginSuccess}
        onSignUpClick={handleSignUpClick}
      />
    </LoginLayout>
  );
};

export default LoginPage;
