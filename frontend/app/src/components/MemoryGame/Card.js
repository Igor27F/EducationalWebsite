import React from "react";

const Card = ({
  frontImage,
  cardData,
  backImage,
  setImage,
  handleClick,
  flipped,
}) => {
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
    </div>
  );
};

export default Card;
