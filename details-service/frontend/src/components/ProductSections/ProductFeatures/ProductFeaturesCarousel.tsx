import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductFeaturesCarousel: React.FC<{ style: any }> = (props) => {
  const [images, setImages] = useState([]);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState("neutral");

  useEffect(() => {
    async function getProductCarousel() {
      const productId =
        window.location.href
          .split("/")
          .filter((item) => {
            return Number(item);
          })
          .join("") || 1;
      const results = await axios(`/images/${productId}`);
      setImages(JSON.parse(results.data.urls));
    }

    getProductCarousel();
  }, []);

  // @ts-ignore
  useEffect(() => {
    if (direction !== "neutral") {
      let counter = Number(position);
      const wholeNumber = setInterval(() => {
        setPosition(
          // @ts-ignore
          direction === "forward"
            ? (counter += 0.1).toFixed(1)
            : (counter -= 0.1).toFixed(1)
        );
        // @ts-ignore
        if (counter.toFixed(1) % 1 === 0) {
          clearInterval(wholeNumber);
          setDirection("neutral");
        }
      }, 35);
      return () => {
        clearInterval(wholeNumber);
      };
    }
  }, [direction]);

  const changeImage = (e: any) => {
    const nextResult = /next/g.test(e.currentTarget.className);
    nextResult ? setDirection("forward") : setDirection("backward");
  };
  const { style } = props;
  const {
    featuresSlider,
    sliderRoot,
    slider,
    sliderViewport,
    innerSlider,
    figureRoot,
    figureFeatures,
    pictureRoot,
    arrowButton,
    prevNextButton,
    prev,
    next,
    arrowButtonIcon,
    arrow
  } = style;

  return (
    <div className={featuresSlider}>
      <div className={sliderRoot}>
        <div className={slider}>
          <div className={sliderViewport}>
            <div
              className={innerSlider}
              style={{ left: "0px", transform: `translateX(${position * -100}%)` }}
            >
              {images !== undefined
                ? images.map((image, index) => {
                    return (
                      <figure
                        className={`${figureRoot}, ${figureFeatures}`}
                        style={{ position: "absolute", left: `${index * 100}%` }}
                        key={index}
                      >
                        <picture className={pictureRoot}>
                          <img crossOrigin="anonymous" src={image}></img>
                        </picture>
                      </figure>
                    );
                  })
                : null}
            </div>

            <button
              className={`${arrowButton} ${prevNextButton} ${prev}`}
              disabled={Number(position) - 1 < 0 ? true : false}
              onClick={changeImage}
            >
              <svg className={arrowButtonIcon} viewBox="0 0 100 100">
                <path
                  className={arrow}
                  d="M33.8352105,100 C31.4906934,99.997936 29.2429547,99.0649124 27.5861629,97.4060557 C24.1379457,93.9535448 24.1379457,88.3604714 27.5861629,84.9079605 L62.6044109,49.8897124 L27.5861629,14.8714644 C24.3395013,11.3872106 24.4353002,5.95761395 27.8028539,2.59006023 C31.1704076,-0.777493487 36.6000043,-0.873292384 40.0842581,2.37336919 L87.6006014,49.8897124 L40.0842581,97.4060557 C38.4274663,99.0649124 36.1797276,99.997936 33.8352105,100 L33.8352105,100 Z"
                ></path>
              </svg>
            </button>
            <button
              className={`${arrowButton} ${prevNextButton} ${next}`}
              disabled={Number(position) + 1 > images.length - 1 ? true : false}
              onClick={changeImage}
            >
              <svg className={arrowButtonIcon} viewBox="0 0 100 100">
                <path
                  className={arrow}
                  d="M33.8352105,100 C31.4906934,99.997936 29.2429547,99.0649124 27.5861629,97.4060557 C24.1379457,93.9535448 24.1379457,88.3604714 27.5861629,84.9079605 L62.6044109,49.8897124 L27.5861629,14.8714644 C24.3395013,11.3872106 24.4353002,5.95761395 27.8028539,2.59006023 C31.1704076,-0.777493487 36.6000043,-0.873292384 40.0842581,2.37336919 L87.6006014,49.8897124 L40.0842581,97.4060557 C38.4274663,99.0649124 36.1797276,99.997936 33.8352105,100 L33.8352105,100 Z"
                  transform="translate(100, 100) rotate(180)"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeaturesCarousel;
