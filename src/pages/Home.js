import Gallery from "../components/Gallery/Gallery";
import React, { useEffect, useCallback } from "react";
import ImgPreview from "../components/ImgPreview/ImgPreview";
import Modal from "../components/Modal/Modal";
import { useStore } from "../context/ImagesStoreContext";
import styles from "./Home.module.css";

const Home = () => {
  const images = useStore((state) => state.images);
  const populateImages = useStore((state) => state.populateImages);
  const setImageIndex = useStore((state) => state.setSelectedImageIndex);
  const selectedImageIndex = useStore((state) => state.selectedImageIndex);
  const selectedImage = useStore((state) =>
    state.images ? state.images[state.selectedImageIndex] : null
  );

  useEffect(() => {
    populateImages();
  }, [populateImages]);

  const onModalClose = useCallback(() => {
    setImageIndex(null);
  }, [setImageIndex]);

  const onNext = () => {
    let index = selectedImageIndex + 1;
    if (index >= images.length) {
      index = 0;
    }
    console.log(index);
    setImageIndex(index);
  };

  const onPrev = () => {
    let index = selectedImageIndex - 1;
    if (index < 0) {
      index = images.length - 1;
    }
    setImageIndex(index);
  };

  return (
    <div className={styles.home}>
      {images ? <Gallery images={images} /> : "Loading..."}

      {selectedImage && (
        <>
          <Modal isOpen={selectedImage} onClose={onModalClose}>
            <ImgPreview
              image={selectedImage}
              onNextClick={onNext}
              onPrevClick={onPrev}
            ></ImgPreview>
          </Modal>
        </>
      )}

      <div className="modal-container" />
    </div>
  );
};

export default Home;
