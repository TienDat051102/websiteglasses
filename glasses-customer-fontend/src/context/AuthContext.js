import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    const user = localStorage.getItem("customer");

    if (token && user) {
      setCustomer(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("customer_token", data.token);
    localStorage.setItem("customer", JSON.stringify(data.customer));
    setCustomer(data.customer);
  };

  const logout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    setCustomer(null);
  };

  const isLoggedIn = !!customer;

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
        logout,
        isLoggedIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
