import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
// import { OnboardModal } from "./components";

// Providers - Contexts
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalContextProvider } from './context';
import { PlayerContextProvider } from './context/playerContext/PlayerContext';
import { Web3ContextProvider } from './context/Web3Provider';
import { AuthProvider } from './context/AuthProvider';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Battleground, Battle, Home, Leaderboard } from './pages';
import Marketplace from './marketplace/src/Marketplace';

const queryClient = new QueryClient();

function App() {
  const theme = createTheme();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Web3ContextProvider>
              <GlobalContextProvider>
                <PlayerContextProvider>
                  {/* <OnboardModal /> */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/battleground" element={<Battleground />} />
                    {/* <Route path="/battle/:battleName" element={<Battle />} />
                     */}
                    <Route path="/battle" element={<Battle />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/marketplace/*" element={<Marketplace />} />
                  </Routes>
                </PlayerContextProvider>
              </GlobalContextProvider>
            </Web3ContextProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
