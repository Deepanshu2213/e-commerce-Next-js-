import { signUpFormSubmit } from '../../actions/logins.action';
import { LoginSignUp } from '../../components/LoginSignup';

const SignupPage = () => {
  return <LoginSignUp type="signup" action={signUpFormSubmit} />;
};

export default SignupPage;
