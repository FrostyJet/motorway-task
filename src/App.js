import React from "react";
import ImagesStoreProvider from "./context/ImagesStoreContext";
import Home from "./pages/Home";

const App = () => (
  <ImagesStoreProvider>
    <Home />
  </ImagesStoreProvider>
);

export default App;
