import React, { useState } from "react";

const Card = ({
  frontImage,
  cardData,
  backImage,
  setImage,
  handleClick,
  flipped,
}) => {
  // const [image, setImg] = useState(frontImage);
  // setImage = (state) => {
  //   switch (state) {
  //     case "front":
  //       setImg(frontImage);
  //       break;

  //     case "back":
  //       setImg(backImage);
  //       break;

  //     case "matched":
  //       setImg(frontImage);
  //       Card.style.opacity = "0.5";
  //       break;

  //     default:
  //       setImg(backImage);
  //       break;
  //   }
  // };

  const Click = () => {
    handleClick(cardData);
  };

  return (
    <div className="card">
      {cardData.flipped ? (
        <img
          className="opacity-50"
          src={cardData.src}
          alt={backImage}
          draggable={false}
        />
      ) : flipped ? (
        <img
          src={cardData.src}
          alt={backImage}
          onClick={Click}
          draggable={false}
        />
      ) : (
        <img
          src={backImage}
          alt={backImage}
          onClick={Click}
          draggable={false}
        />
      )}
      {/* <img src={image} alt={image} onClick={Click} draggable={false} /> */}
    </div>
  );
};

export default Card;
