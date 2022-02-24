import createContext from "zustand/context";
import createStore from "../store/createStore";

const { Provider: LocalProvider, useStore } = createContext();

const Provider = ({ children }) => (
  <LocalProvider createStore={createStore}>{children}</LocalProvider>
);

export default Provider;

export { useStore };
