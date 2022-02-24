import Gallery from "../components/Gallery/Gallery";
import React, { useEffect, useCallback } from "react";
import ImgPreview from "../components/ImgPreview/ImgPreview";
import Modal from "../components/Modal/Modal";
import { useStore } from "../context/ImagesStoreContext";
import styles from "./Home.module.css";
import Form from "../components/Form/Form";

const Home = () => {
  const images = useStore((state) => state.images);
  const populateImages = useStore((state) => state.populateImages);
  const setImageIndex = useStore((state) => state.setSelectedImageIndex);
  const selectedImageIndex = useStore((state) => state.selectedImageIndex);
  const selectedImage = useStore((state) =>
    state.images ? state.images[state.selectedImageIndex] : null
  );

  const [isFormOpen, setIsFormOpen] = React.useState(false);

  useEffect(() => {
    populateImages();
  }, [populateImages]);

  const onModalClose = useCallback(() => {
    setImageIndex(null);
  }, [setImageIndex]);

  const onNext = useCallback(() => {
    let index = selectedImageIndex + 1;
    if (index >= images.length) {
      index = 0;
    }
    setImageIndex(index);
  }, [setImageIndex, selectedImageIndex, images]);

  const onPrev = useCallback(() => {
    let index = selectedImageIndex - 1;
    if (index < 0) {
      index = images.length - 1;
    }
    setImageIndex(index);
  }, [setImageIndex, selectedImageIndex, images]);

  return (
    <div className={styles.home}>
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className={styles.sampleFormBtn}
      >
        Toggle Sample form
      </button>
      <Form isOpen={isFormOpen} />

      <div>{images ? <Gallery images={images} /> : "Loading..."}</div>

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
