import React, { createContext, useContext, useState } from 'react';
import StateProps from './routes/Detail';

interface AppContextProps {
  stateVal: typeof StateProps;
  setStateVal: React.Dispatch<React.SetStateAction<typeof StateProps>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC = ({ children }) => {
  const [stateVal, setStateVal] = useState<typeof StateProps>({
    date: '',
    item: '',
    amount: 0,
    description: '',
    id: '',
  });

  return (
    <AppContext.Provider value={{ stateVal, setStateVal }}>
      {children}
    </AppContext.Provider>
  );
};
