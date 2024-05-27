import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Login = () => {
  return (
    <main className="bg-gradient-to-r from-blue-500 to-indigo-500 flex min-h-screen justify-center items-center">
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
