'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AllocationTable from '../components/AllocationTable';

const Home = () => (
  <Provider store={store}>
    <AllocationTable />
  </Provider>
);

export default Home;
