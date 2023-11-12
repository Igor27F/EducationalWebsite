import React, { useEffect, useState } from "react";
import Card from "./Card";
import backImage from "./images/rakanpensativo.png";
import "../MemoryGame/MemoryGame.css";
import { Typography } from "@mui/material";

const pokemonAPI =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const totalCards = 12;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MemoryGame = () => {
  const [gameRunning, setGameRunning] = useState(false);
  const [cards, setCards] = useState([]);
  const [flipTime, setFlipTime] = useState(false);
  const [timerStyle, setTimerStyle] = useState({});
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [screen, setScreen] = useState("game");
  const [timer, setTimer] = useState(null);
  // const [selectedCards, setSelectedCards] = useState([]);
  // const [matchedCards, setMatchedCards] = useState([]);

  const startGame = () => {
    var randomCards = [];
    for (let i = 0; i < totalCards / 2; i++) {
      let randomNumber;
      while (
        randomNumber === undefined ||
        randomNumber == null ||
        randomCards.includes(randomNumber)
      ) {
        randomNumber = Math.floor(Math.random() * 897) + 1;
      }
      randomCards.push(
        {
          src: pokemonAPI + randomNumber + ".png",
          number: randomNumber,
          id: i,
          flipped: false,
        },
        {
          src: pokemonAPI + randomNumber + ".png",
          number: randomNumber,
          id: i + totalCards / 2,
          flipped: false,
        }
      );
      // randomCards.push(
      //   pokemonAPI + randomNumber + ".png",
      //   pokemonAPI + randomNumber + ".png"
      // );
    }
    shuffle(randomCards);
    setCards(randomCards);
  };
  // useEffect(() => {
  //   console.log(gameRunning);
  // }, [gameRunning]);

  const resetGame = () => {
    setScreen("game");
    // setSelectedCards([]);
    // setMatchedCards([]);
    startGame();
    var memTime = 5;
    setTimerStyle({ animation: "timer-animation " + memTime + "s linear" });
    setTimeout(() => {
      setFlipTime(true);
      setGameRunning(true);
      startFlip();
    }, memTime * 1000);
    // document.getElementById("timer").style.animation =
    //   "timer-animation-reverse " + 10 + "s linear";
  };

  const startFlip = () => {
    var flipTimer = 15;
    setTimerStyle({
      animation: "timer-animation-reverse " + flipTimer + "s linear",
    });
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        // setGameRunning(true);
        // endFlip();
        console.log("game running: " + gameRunning);
        setFlipTime(false);
      }, flipTimer * 1000)
    );
  };

  useEffect(() => {
    if (!flipTime && gameRunning) {
      setGameRunning(false);
      setScreen("defeat");
    }
  }, [flipTime, gameRunning]);

  const handleCardClick = (card) => {
    if (gameRunning) {
      if (choiceOne) {
        if (choiceOne.id !== card.id) {
          if (!choiceTwo) {
            setChoiceTwo(card);
          }
        }
      } else {
        setChoiceOne(card);
      }
    }
    // choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // changeCardImage("back");

    // if (selectedCards.length === 2) {
    //   return;
    // }
    // setSelectedCards([...selectedCards, card]);
    // if (selectedCards.length === 1 && selectedCards[0].id !== card.id) {
    //   setTimeout(() => {
    //     setSelectedCards([]);
    //   }, 1000);
    // }
    // if (selectedCards.length === 1 && selectedCards[0].id === card.id) {
    //   setMatchedCards([...matchedCards, selectedCards[0], card]);
    //   setSelectedCards([]);
    // }
  };

  useEffect(() => {
    if (gameRunning && cards.length !== 0 && choiceOne && choiceTwo) {
      if (choiceOne.number === choiceTwo.number) {
        setCards(
          cards.map((card) => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, flipped: true };
            }
            return card;
          })
        );
        setChoiceOne(null);
        setChoiceTwo(null);
        // if (cards.every((card) => card.flipped)) {
        //   console.log("ganhou");
        //   setGameRunning(false);
        //   setTimerStyle({});
        //   setScreen("victory");
        // } else {
        //   console.log(cards);
        // }
      } else {
        setTimeout(() => {
          setChoiceOne(null);
          setChoiceTwo(null);
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo, cards, gameRunning]);

  useEffect(() => {
    //verifica se todas as cartas foram viradas
    if (
      cards.length !== 0 &&
      gameRunning &&
      cards.every((card) => card.flipped)
    ) {
      setGameRunning(false);
      setTimerStyle({});
      setScreen("victory");
    }
  }, [cards, gameRunning]);

  // const changeCardImage = (state) => {
  //   return state;
  // };

  const renderCards = () => {
    return cards.map((card, index) => (
      <Card
        key={index}
        backImage={backImage}
        cardData={card}
        // frontImage={card}
        // setImage={changeCardImage}
        handleClick={handleCardClick}
        flipped={
          choiceOne?.id === card.id ||
          choiceTwo?.id === card.id ||
          card.flipped ||
          !gameRunning
        }
      />
    ));
  };

  //   const renderMessage = () => {
  //     if (matchedCards.length === cards.length) {
  //       return <div>You won!</div>;
  //     }

  //     if (selectedCards.length === 2) {
  //       return <div>Try again!</div>;
  //     }

  //     return null;
  //   };

  return (
    <div className="gameScreen">
      {screen === "game" ? (
        cards.length !== 0 ? (
          <div id="gameStarted">
            <div id="timerContainer">
              <div id="timer" style={timerStyle}>
                <h1 id="timerText">Memorize as cartas</h1>
              </div>
            </div>
            <div className="card-grid">{renderCards()}</div>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <button onClick={resetGame}>
              <Typography variant="h1">Começar</Typography>
            </button>
          </div>
        )
      ) : screen === "victory" ? (
        <div className="h-full flex justify-center items-center flex-col">
          <Typography variant="h1">Você ganhou</Typography>
          <button onClick={resetGame} className="mt-8">
            <Typography variant="h3">Jogar novamente</Typography>
          </button>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <Typography variant="h1">Você perdeu</Typography>
          <button onClick={resetGame} className="mt-8">
            <Typography variant="h3">Tentar novamente</Typography>
          </button>
        </div>
      )}
      {/* <button onClick={() => console.log(cards)}>teste</button> */}
      {/* {renderMessage()} */}
    </div>
  );
};

export default MemoryGame;
