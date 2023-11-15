import React, { useState, useEffect } from "react";
import Image from "next/image";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "../../styles/Header.module.css";
import logo from "../../public/images/ks_logo_neg.png";

import SwiperInner from "./SwiperInner";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Header = ({ header, showAbout }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const { windowHeight } = useWindowDimensions();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const arrowFunction = () => {
    setShowArrow(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const noHeader = () => {
    setHideHeader(true);
  };

  useEffect(() => {
    scrollPosition >= 100 && setShowArrow(false);
  }, [scrollPosition]);

  useEffect(() => {
    setTimeout(arrowFunction, 5000);
  }, []);

  useEffect(() => {
    showAbout && setTimeout(noHeader, 500);
    !showAbout && setHideHeader(false);
  }, [showAbout]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <div
          className={styles.logo}
          style={{ opacity: scrollPosition > windowHeight / 4 ? "0" : "1" }}
        >
          <Image
            fill
            src={logo}
            style={{ objectFit: "contain" }}
            alt={"Knüppel & Scheffler Logo"}
          />
        </div>
      </div>

      <div
        className={styles.arrowWrapper}
        style={{ opacity: showArrow ? "1" : "0" }}
      >
        <div className={styles.arrow}>↓</div>
      </div>
      {!hideHeader && (
        <Swiper
          loop={true}
          autoplay={{
            delay: 4000,
          }}
          modules={[Autoplay]}
          speed={1000}
        >
          {header.map((entry, i) => (
            <SwiperSlide key={i}>
              {entry.image.credit ? (
                <div className={styles.imageCredit}>
                  © {entry?.image.credit}
                </div>
              ) : (
                ""
              )}
              <SwiperInner entry={entry} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Header;
