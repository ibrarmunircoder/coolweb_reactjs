import { useAuthActions } from '@/shared/hooks/useAuthStore';
import { Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';
import { Link, NavLink } from 'react-router-dom';

export const Navigation = () => {
  const { setUser, setUserSession } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    setUser(undefined);
    setUserSession(undefined);
  };

  return (
    <header className="fixed bg-white top-0 left-0 right-0 w-full h-14 shadow-lg z-50">
      <nav className="p-4 flex justify-between items-center w-full h-full">
        <Heading level={5}>
          <Link to="/">App Logo</Link>
        </Heading>
        <ul className="hidden sm:flex items-center gap-4 text-lg">
          <li>
            <NavLink
              to="/add-store"
              className={({ isActive }) =>
                isActive
                  ? `text-[#047D95] underline underline-offset-8 decoration-2 font-bold`
                  : 'text-black font-normal'
              }
            >
              Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? `text-[#047D95] underline underline-offset-8 decoration-2 font-bold`
                  : 'text-black font-normal'
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ai-blogs"
              className={({ isActive }) =>
                isActive
                  ? `text-[#047D95] underline underline-offset-8 decoration-2 font-bold`
                  : 'text-black font-normal'
              }
            >
              Drafts
            </NavLink>
          </li>
        </ul>
        <Button onClick={handleSignOut} variation="link">
          Sign out
        </Button>
      </nav>
    </header>
  );
};
