import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ConfigProvider, Spin } from 'antd';
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
let persistor = persistStore(store);
import App from "./App"
const LoadingStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loading = (
  <LoadingStyle>
    <Spin size="large" />
  </LoadingStyle>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense fallback={Loading}>
    <BrowserRouter>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.Suspense>

);