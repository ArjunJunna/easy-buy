import React from 'react';
import { useSetLocalStorage } from './useSetLocalStore.ts';

interface MyComponentProps {
  children: React.ReactNode;
}

const LocalStorageSyncProvider= ({ children }:MyComponentProps) => {
  useSetLocalStorage(); 
  return <>{children}</>; 
};

export default LocalStorageSyncProvider;
