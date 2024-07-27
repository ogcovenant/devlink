"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";

interface UserContextType {
  isAuthenticated: boolean;
  profile: {};
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setProfile: (profile: {}) => void;
}

const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  profile: {},
  setIsAuthenticated: () => {},
  setProfile: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/me");

      if (res.status === 200) {
        setIsAuthenticated(true);
        setProfile(res.data.user);
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 403) {
        setIsAuthenticated(false);
        setProfile({});
      }

      if (error.response?.status === 404) {
        setIsAuthenticated(false);
        setProfile({});
      }

      if (error.response?.status === 500) {
        setIsAuthenticated(false);
        setProfile({});
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<any>({});

  return (
    <UserContext.Provider
      value={{ isAuthenticated, profile, setIsAuthenticated, setProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useProfileCtx = () => {
  const ctx = useContext(UserContext);

  return ctx;
};

export { UserProvider, useProfileCtx };
