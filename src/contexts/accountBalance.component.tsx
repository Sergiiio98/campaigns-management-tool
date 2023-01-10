import { createContext, useState } from "react";

interface IContext {
  currentBalance: number;
  setCurrentBalance: (balance: number) => void;
}

export const AccountContext = createContext<IContext>({
  currentBalance: 0,
  setCurrentBalance: () => {},
});

export const AccountProvider = ({ children }: any) => {
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const value = { currentBalance, setCurrentBalance };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
