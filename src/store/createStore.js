import create from "zustand";
import { persist } from "zustand/middleware";
import createImagesSlice from "./createImagesSlice";

export const createStore = () =>
  create(
    persist(
      (set, get) => ({
        ...createImagesSlice(set, get),
      }),
      {
        name: "images",
        getStorage: () => localStorage,
      }
    )
  );

export default createStore;
