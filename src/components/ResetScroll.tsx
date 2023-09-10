import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ResetScrollProps = {
  children: React.ReactNode;
};

export const ResetScroll = ({ children }: ResetScrollProps) => {
  const location = useLocation();

  useEffect(() => window.scrollTo(0, 0), [location]);

  return <>{children}</>;
};
