import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./component/ErrorBoundary.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ErrorBoundary> */}
        <Provider store={store}>
          <App />
        </Provider>
      {/* </ErrorBoundary>   */}
    </BrowserRouter>
  </StrictMode>
);
