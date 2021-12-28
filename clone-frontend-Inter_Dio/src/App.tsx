import { ThemeProvider } from 'styled-components';

import Router from './routes';
import {theme} from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import {ProviderContext} from './context/AuthContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProviderContext>
       <GlobalStyle/>
       <Router/> 
      </ProviderContext>
    
      
    </ThemeProvider>
  );
}

export default App;
