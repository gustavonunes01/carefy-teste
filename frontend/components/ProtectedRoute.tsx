import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FrontEndRoutes } from '../config/front-end-routes';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, checkAuth, hasAccess} = useAuth();
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    const checkAuthentication = async () => {

      let isAuth = await checkAuth()
      if (!isAuth) {
       return await router.push(FrontEndRoutes.LOGIN.route);
      }
      
      const access = await hasAccess(currentRoute);
      if (!access) {
        router.push(FrontEndRoutes.UNAUTHORIZED.route);
      }
    };

    checkAuthentication();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
