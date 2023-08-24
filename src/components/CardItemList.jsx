import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [lastCard, setLastCard] = useState(null);
  const onClickHandler = (currentId) => {
    const clickedCard = cardList.filter(({ id }) => id === currentId);
    if (!lastCard) {
      setLastCard(clickedCard);
      const firstSet = cardList.map((card) => {
        return card?.id === currentId ? { ...card, isOpen: true } : { ...card };
      });
      setLastCard(clickedCard[0]);
      setCardList(firstSet);
    } else {
      if (clickedCard[0]?.name !== lastCard?.name) {
        const revertList = cardList.map((card) => {
          return card?.id === lastCard?.id
            ? { ...card, isOpen: false }
            : { ...card };
        });
        setLastCard(null);
        setCardList(revertList);
      } else {
        const updatedList = cardList.map((card) => {
          return card?.id === currentId
            ? { ...card, isOpen: true }
            : { ...card };
        });
        setLastCard(null);
        setCardList(updatedList);
      }
    }
  };
  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={() => {
              onClickHandler(item.id);
            }}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
