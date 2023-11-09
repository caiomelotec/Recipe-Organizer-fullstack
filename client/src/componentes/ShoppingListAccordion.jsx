import React from "react";
import { AccordionSection } from "./AccordionSection";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShoppingListAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingListByUserId = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/getshoppinglistinfo",
          { withCredentials: true }
        );
        setShoppingList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShoppingListByUserId();
  }, []);

  let recipes = shoppingList ? shoppingList : null;

  return (
    <>
      {shoppingList == null || shoppingList.length == 0 ? (
        <h3>Deine Einkaufsliste is leer 😥</h3>
      ) : (
        recipes.map((item, i) => (
          <div className="shoppingliste-info-div" key={i}>
            <AccordionSection
              item={item}
              key={item.shoppingList_id}
              isActiveSection={activeIndex === i}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              sectionIndex={i}
            />
          </div>
        ))
      )}
    </>
  );
};
