import Card from "../Card/Card";
import React from "react";
import Masonry from "react-masonry-css";
import styles from "./Gallery.module.css";

const breakpoints = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Gallery = React.memo(({ images }) => {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className={styles.gallery}
      columnClassName={styles.galleryColumn}
    >
      {images.map((img, index) => (
        <Card key={img.id} index={index}></Card>
      ))}
    </Masonry>
  );
});

export default Gallery;
