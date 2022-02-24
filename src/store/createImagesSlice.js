const createImagesSlice = (set, get) => ({
  images: null,
  selectedImageIndex: null,
  setSelectedImageIndex: (index) => set({ selectedImageIndex: index }),
  populateImages: () => {
    fetch("images?limit=10")
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        set({ images: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
});

export default createImagesSlice;
