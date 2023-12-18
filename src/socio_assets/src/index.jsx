import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { AuthClient } from "../../../node_modules/@dfinity/auth-client/lib/cjs/index";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const authClient = await AuthClient.create();
await authClient.login({
  identityProvider: "https://identity.ic0.app/#authorize",
  onSuccess: async () => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
})