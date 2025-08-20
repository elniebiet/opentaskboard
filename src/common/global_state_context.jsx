import React, { createContext, useState } from "react";
import { OTB_LS_ROUTE_NAME } from "./globals";

export const _global_state_context = createContext();

export const _global_state_provider = ({ children }) => {
  const _get_initial_route = () => {
    if (typeof window !== "undefined") {
      const saved_route = window.localStorage.getItem(OTB_LS_ROUTE_NAME);
      if (saved_route) return saved_route;
    }

    return "/";
  };

  const [global_route, _set_global_route] = useState(_get_initial_route());

  const [global_email, _set_global_email] = useState("");

  const [global_login_status, _set_global_login_status] = useState(false);

  const [global_access_token, _set_global_access_token] = useState("");

  return (
    <_global_state_context.Provider 
      value={{ 
        global_route, _set_global_route, 
        global_email, _set_global_email, 
        global_login_status, _set_global_login_status,
        global_access_token, _set_global_access_token,
      }}>
      {children}
    </_global_state_context.Provider>
  );
};