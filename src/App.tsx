import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Home from './routes/Home';
import Detail, { StateProps } from './routes/Detail';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/:id', element: <Detail /> },
]);

const AppContext = createContext<
  | {
      stateVal: StateProps;
      setStateVal: React.Dispatch<React.SetStateAction<StateProps>>;
    }
  | undefined
>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

function App() {
  const [stateVal, setStateVal] = useState<StateProps>({
    date: '',
    item: '',
    amount: 0,
    description: '',
    id: '',
  });
  return (
    <AppContext.Provider value={{ stateVal, setStateVal }}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{box-sizing: border-box}
  body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
    background-color: rgb(48,196,182);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
