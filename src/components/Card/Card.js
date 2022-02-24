import React, { useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineHeart } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useStore } from "../../context/ImagesStoreContext";
import styles from "./Card.module.css";

const Card = ({ index }) => {
  const setSelected = useStore((state) => state.setSelectedImageIndex);
  const image = useStore((state) => state.images[index]);
  const { user } = image;

  const onZoomClick = useCallback(() => {
    setSelected(index);
  }, [setSelected, index]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <img
          className={styles.avatar}
          src={`${user.profile_image}.jpg`}
          alt={user.username}
        />
        <div className={styles.name}>
          <span className={styles.nickname}>{user.username}</span>
          <span className={styles.location}>{user.location}</span>
        </div>
      </div>

      <div className={styles.banner}>
        <LazyLoadImage
          alt={image.alt}
          height={image.height}
          src={`${image.url}.jpg`}
          className={styles.image}
          width={image.width}
          placeholder={
            <span className={styles.placeholder}>
              <AiOutlineLoading className={styles.loader} />
            </span>
          }
        />

        <BsArrowsFullscreen
          onClick={onZoomClick}
          className={styles.coverIcon}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.likes}>
          <AiOutlineHeart />
          <span className={styles.count}>{image.likes}</span>
          <span className={styles.label}>&nbsp;likes</span>
        </div>

        <div className={styles.insight}>
          <div className={styles.icon}>
            <FaQuoteLeft />
          </div>
          <div>
            <p className={styles.description}>
              {image.description || image.alt_description}
            </p>
            <p className={styles.publishedDate}>
              Published at {image.created_at.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
