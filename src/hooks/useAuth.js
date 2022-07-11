import React, { useState, useContext, createContext, useCallback } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@services/api";

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  //Código copiado de un aporte
  const fetchUser = useCallback(async () => {
    try {
      const token = Cookie.get("token");

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
    const options = {
      Headers: {
        accept: "*/*", //acá le digo que acepte todas las solicitudes
        "Content-Type": "application/json", //que acepte json
      },
    };
    try {
      const { data } = await axios.post(endPoints.auth.login, { email, password }, options);
      //al usar el método post, exios me devuelve los datos de la respuesta dentro de data
      //y la API en la respuesta me envía un acces_token
      //Axios.post recibe tres parametros 1- La solicitud a la API, 2- Parámetros, en este
      //caso usuario y contraseña 3- Opciones o configuraciones que le podemos añadir

      if (data) {
        //creo la cookie que se va a guardar como token
        Cookie.set("token", data.access_token, { expires: 5 });

        // //agrego el token a los headers que va a usar axios a la hora de comunicarce con la API
        // axios.defaults.headers.Authorization = `Bearer ${data.access_token}`;

        // //ahora traigo al usuario desde la API mediante una solicitud GET
        // const { data: user } = await axios.get(endPoints.auth.profile);

        // //y agrego user al context
        // setUser(user);
        await fetchUser();
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        setUser(null);
        throw error;
      }
    }
  };

  return { user, signIn };
}
