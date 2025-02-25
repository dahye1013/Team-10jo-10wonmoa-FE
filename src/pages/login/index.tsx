import React from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '@styles';
import { GoogleLogin } from 'react-google-login';

import LoginForm from './components/LoginForm';
import { LoginLayout } from '@components';
import { LoginUser } from '@types';
import useAuth from '@hooks/auth/useAuth';
const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const googleClientId = process.env.REACT_APP_CLIENT_ID || '';

  const onLoginSuccess = async (res: unknown) => {
    console.log(res);
  };

  const submitHandler = async (loginUser: LoginUser) => {
    await logIn(loginUser);
    await navigate('/account-book/daily');
  };

  return (
    <LoginLayout title="로그인" isActiveGoBack={true}>
      <LoginForm submitHandler={submitHandler} buttonTitle="로그인하기" />
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Google로 로그인하기"
        onSuccess={(res) => onLoginSuccess(res)}
        onFailure={(res) => console.log(res)}
      />

      <LoginDescription>
        <p>오늘 처음이신가요?</p>
        <Link to={'/signUp'}>회원가입하기</Link>
      </LoginDescription>
    </LoginLayout>
  );
};

export default Login;

const LoginDescription = styled.span`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  > * {
    &:nth-child(2) {
      color: ${theme.$primary};
    }
  }
`;
