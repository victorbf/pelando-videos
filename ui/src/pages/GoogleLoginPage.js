import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { LoginContainer, Login } from '../components/common/Login';
import Logo from '../assets/images/pelando.png';

const GoogleLoginPage = ({ history }) => {
  const handleSuccess = (loginInfo) => {
    localStorage.setItem('profile', JSON.stringify({ ...loginInfo.profileObj }));
    localStorage.setItem('token', loginInfo.accessToken);
    history.push('/playando');
  };

  return (
    <LoginContainer>
      <Login>
        <img src={Logo} alt="logo" width="100" />
        <div className="mt-4">
          <h1 className="mb-3">Faça login com sua conta google</h1>
          <GoogleLogin
            clientId="1015749006092-v6s00reo7n6g74pbshn9t8m9mf0che12.apps.googleusercontent.com"
            redirectUri="http://localhost:3000, https://victorbf.github.io"
            scope="profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner-channel-audit"
            buttonText="Entrar com sua conta google"
            onSuccess={handleSuccess}
            onFailure={() => toast.error('Ocorreu um erro ao autenticar. Tente novamente.')}
          />
        </div>
      </Login>
    </LoginContainer>
  );
};

GoogleLoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(GoogleLoginPage);
