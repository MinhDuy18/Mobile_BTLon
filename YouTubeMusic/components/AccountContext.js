// Context.js
import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [avatar, setAvatar] = useState('');
  return (
    <AccountContext.Provider value={{avatar,setAvatar}}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within a AccountProvider');
  }
  return context;
};
