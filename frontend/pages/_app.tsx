import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css';

import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationProvider';
import { LoadingProvider } from '../context/LoadingProvider';
import Notifications from '../components/AlertToast/Notifications';
import React from "react";

function MyApp({ Component, pageProps }: any) {

  return <>
    {/*<PrimeReactProvider value={{ unstyled: false, pt: Tailwind, ptOptions: { mergeSections: true, mergeProps: false, classNameMergeFunction: twMerge } }}>*/}
    <NotificationProvider>
      <LoadingProvider>

        <AuthProvider>
          <Notifications/>
          
          <Component {...pageProps} />
        </AuthProvider>
      </LoadingProvider>
    </NotificationProvider>
    {/*</PrimeReactProvider>*/}
  </>
}

export default MyApp;
