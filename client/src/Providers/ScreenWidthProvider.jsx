import { createContext, useState, useEffect } from 'react';
export const ScreenWidthContext = createContext(false);
const ScreenWidthProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 720);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <ScreenWidthContext.Provider value={isSmallScreen}>
      {children}
    </ScreenWidthContext.Provider>
  );
};

export default ScreenWidthProvider;
