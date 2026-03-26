import { getGooleAuthUrl } from '@/app/utility/responseUtils';
import { loginFormSubmit } from '../../actions/logins.action';
import { LoginSignUp } from '../../components/LoginSignup';

export default function Login() {
  const url = getGooleAuthUrl();
  return <LoginSignUp type="login" action={loginFormSubmit} url={url} />;
}
