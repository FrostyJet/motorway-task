import React, { useCallback, useEffect } from "react";
import styles from "./ImgPreview.module.css";
import { BiChevronRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const ImgPreview = ({ image, onNextClick, onPrevClick }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        onNextClick();
      } else if (e.key === "ArrowLeft") {
        onPrevClick();
      }
    },
    [onNextClick, onPrevClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            className={styles.avatar}
            src={`${image.user.profile_image}.jpg`}
            alt={image.user.name}
          />
          <div className={styles.name}>
            <span className={styles.fullname}>
              {image.user.first_name} {image.user.last_name}
            </span>
            <span className={styles.location}>{image.user.location}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href={`${image.url}.jpg`}
            className={styles.downloadBtn}
            target="blank"
            download
          >
            <span className={styles.icon}>
              <i className="fas fa-external-link-alt"></i>
            </span>
            <span className={styles.label}>Download</span>
          </a>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.image}>
          <img src={`${image.url}.jpg`} alt={image.alt_description} />
        </div>

        <div className={styles.mobileInfo}>
          <div className={styles.likes}>
            <AiOutlineHeart />
            &nbsp;
            <span className={styles.count}>{image.likes}</span>
            <span className={styles.label}>&nbsp;likes</span>
          </div>
        </div>
      </div>

      <button className={`${styles.arrowLeft}`} onClick={onPrevClick}>
        <BiChevronLeft />
      </button>
      <button className={`${styles.arrowRight}`} onClick={onNextClick}>
        <BiChevronRight />
      </button>
    </>
  );
};

export default ImgPreview;
