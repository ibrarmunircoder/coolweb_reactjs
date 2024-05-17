import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Login = () => {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <Authenticator>
        {({ user }) => {
          if (user) {
            window.location.href = '/add-store';
          }
          return <></>;
        }}
      </Authenticator>
    </main>
  );
};

export default Login;
