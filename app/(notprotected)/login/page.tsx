import { loginFormSubmit } from '../../actions/logins.action';
import { LoginSignUp } from '../../components/LoginSignup';

export default function Login() {
  return <LoginSignUp type="login" action={loginFormSubmit} />;
}
