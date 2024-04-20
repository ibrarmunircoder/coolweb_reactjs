import { useAuthActions } from '@/shared/hooks/useAuthStore';
import { Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';

export const Navigation = () => {
  const { setUser, setUserSession } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    setUser(undefined);
    setUserSession(undefined);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-14 shadow-lg">
      <nav className="p-4 flex justify-between items-center w-full h-full">
        <Heading level={5}>App Logo</Heading>
        <Button onClick={handleSignOut} variation="link">
          Sign out
        </Button>
      </nav>
    </header>
  );
};
