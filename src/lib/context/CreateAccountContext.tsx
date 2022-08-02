import React from 'react';
import { CustomerInfo } from '../interfaces/CustomerInfo';
import { CreateAccountInfo } from '../interfaces/CreateAccountInfo';

type State = {
  createAccountInfo:  CreateAccountInfo;
  customerInfo: CustomerInfo;
};
type Action =
  | { type: 'updateAccountInfo'; payload: CreateAccountInfo }
  | { type: 'updateCustomerInfo'; payload: CustomerInfo };
type Dispatch = (action: Action) => void;
type CheckoutProviderProps = { children: React.ReactNode };

const initialState: State = {
  createAccountInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    repName: '',
    repEmail: '',
    repPhone: '',
    kW: '',
    loan_amount: '',
  },
  customerInfo: {
    ssn: '',
    dateOfBirth: '',
    photoIdPath: '',
    proofOfAddressPath: '',
    toc_agreement_ind: false,
    poa_agreement_ind: false,
  },
};

const CheckoutContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const checkoutReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'updateAccountInfo': {
      return {
        ...state,
         createAccountInfo: action.payload,
      };
    }
    case 'updateCustomerInfo': {
      return {
        ...state,
        customerInfo: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
console.log('state', initialState);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [state, dispatch] = React.useReducer(checkoutReducer, initialState);
  const value = { state, dispatch };
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  if (context) {
    return context;
  }
  throw new Error('useCheckout must be used within a CheckoutProvider');
};

export { CheckoutProvider, useCheckout };
