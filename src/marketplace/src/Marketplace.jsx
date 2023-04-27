import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import { StateContextProvider } from './context';
import { Sidebar, Navbar } from './components';
import { CardDetails, CreateCampaign, Home, Profile, Withdraw } from './pages';

const Marketplace = () => {
  return (
    <StateContextProvider>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route
              path="marketplace/card-details/:id"
              element={<CardDetails />}
            />
            <Route
              path="/profile/marketplace/card-details/:id"
              element={<CardDetails />}
            />
          </Routes>
        </div>
      </div>
    </StateContextProvider>
  );
};

export default Marketplace;
