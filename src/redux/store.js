import { configureStore } from '@reduxjs/toolkit';
import chalet from './reducers/chalet';
import resort from './reducers/resort';
import hall from './reducers/hall';
import employee from './reducers/employee';
import finance from './reducers/finance';
import customer from './reducers/customer';
import reservation from './reducers/reservation';
import rates from './reducers/rates';

export const store = configureStore({
  reducer: {
    chalet,
    hall,
    resort,
    employee,
    finance,
    customer,
    reservation,
    rates,
        
  },
});
