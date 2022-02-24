import create from "zustand";
import createImagesSlice from "./createImagesSlice";

const createStore = () =>
  create((set, get) => ({
    ...createImagesSlice(set, get),
  }));

export default createStore;
