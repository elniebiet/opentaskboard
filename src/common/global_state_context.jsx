import React, { createContext, useState } from "react";

export const _global_state_context = createContext();

export const _global_state_provider = ({ children }) => {
  const [global_route, _set_global_route] = useState("/");

  const [global_email, _set_global_email] = useState("");

  return (
    <_global_state_context.Provider value={{ global_route, _set_global_route, global_email, _set_global_email }}>
      {children}
    </_global_state_context.Provider>
  );
};