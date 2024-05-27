import { useAuthActions } from '@/shared/hooks/useAuthStore';
import { Button, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';
import { Link, NavLink } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import ServiceIcon from './ServiceIcon';

export const Navigation = () => {
  const { setUser, setUserSession } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    setUser(undefined);
    setUserSession(undefined);
  };

  return (
    <header className="fixed bg-white dark:bg-neutral-900 top-0 left-0 right-0 w-full h-16 shadow-lg z-50">
      <nav className="flex justify-between items-center w-full h-full">
        <div className="left-nav flex items-center">
          <Link className="m-2 flex items-center align-center" to="/">        

          <ServiceIcon gradientFrom="#3B82F6" gradientTo="#312E81" text="Bw" isDarkText={false}/>
          <div className="text-black dark:text-white font-cd-extended m-2">Blog Writer</div>
          </Link>
        </div>

        <ul className="hidden sm:flex items-center gap-4 font-cd-light text-sm">
          <li>
            <NavLink
              to="/add-store"
              className={({ isActive }) =>
                isActive
                  ? `text-black dark:text-blue-200 underline underline-offset-8 decoration-2 font-bold`
                  : 'text-black dark:text-blue-200 font-normal'
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
                  ? `text-black dark:text-blue-200 underline underline-offset-8 decoration-2 font-bold`
                  : 'text-black dark:text-blue-200 font-normal'
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
                  ? `text-black dark:text-blue-200 underline underline-offset-8 decoration-2 font-bold`
                  : 'text-black dark:text-blue-200 font-normal'
              }
            >
              Drafts
            </NavLink>
          </li>
        </ul>

        <ThemeSwitcher></ThemeSwitcher>
        
        <Button onClick={handleSignOut} variation="link">
          Sign out
        </Button>
      </nav>
    </header>
  );
};
