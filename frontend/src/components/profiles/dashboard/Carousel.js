import React, { useEffect, useState } from "react";

const Carousel = ({
  children,
  startingPos,
  itemsInCarousel,
  carouselContainer,
}) => {
  const [currentItem, setCurrentItem] = useState(startingPos);
  const [carouselSize, setCarouselSize] = useState(children.length);

  let clientWidth = document.body.clientWidth;

  if (carouselContainer.current) {
    clientWidth = carouselContainer.current.clientWidth;
  }

  let cardWidth = clientWidth / itemsInCarousel;
  const cardStyle = {
    width: `calc(${cardWidth.toString()}px - 1rem)`,
  };

  const listStyle = {
    width: cardWidth * carouselSize,
    transform: `translateX(${cardWidth * -currentItem}px)`,
  };

  useEffect(() => {
    setCurrentItem(
      startingPos > children.length - itemsInCarousel
        ? children.length - itemsInCarousel
        : startingPos
    );
  }, [startingPos]);

  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        <div className={`carousel__list`} style={listStyle}>
          {children.map((child) =>
            React.cloneElement(child, {
              cardStyle: cardStyle,
            })
          )}
        </div>
      </div>
      <i
        className={`carousel__left fas fa-chevron-left ${
          currentItem == 0 ? "disable" : ""
        }`}
        onClick={() => currentItem != 0 && setCurrentItem(currentItem - 1)}
      ></i>
      <i
        className={`carousel__right fas fa-chevron-right ${
          currentItem == carouselSize - itemsInCarousel ? "disable" : ""
        }`}
        onClick={() =>
          currentItem != carouselSize - itemsInCarousel &&
          setCurrentItem(currentItem + 1)
        }
      ></i>
    </div>
  );
};

export default Carousel;
