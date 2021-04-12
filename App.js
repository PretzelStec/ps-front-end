import React from 'react';
import MainNav from './component/mainNav';
import AuthContextProvider from './component/AuthContext'
import KeyContextProvider from './component/KeyContext'

export default function App() {
  return (
    <KeyContextProvider>
    <AuthContextProvider>
      <MainNav />
    </AuthContextProvider>
    </KeyContextProvider>
  );
}
