// Libraries
import { useState, useContext, createContext, useEffect, useCallback } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

// Services
import endPoints from '@services/api/index';

const AuthContext = createContext();

const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  /**
   * Function to get the user from the API with the token stored in the cookies
   */
  const fetchUser = useCallback(async () => {
    try {
      const token = cookie.get('token');

      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);

        setUser(user);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const options = {
        Headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);

      if (access_token) {
        const token = access_token.access_token;
        cookie.set('token', token, { expires: 5 });
      }

      await fetchUser();
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(fetchUser, [fetchUser]);

  return { user, signIn };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
