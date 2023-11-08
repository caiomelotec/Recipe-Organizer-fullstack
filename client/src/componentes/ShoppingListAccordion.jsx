import { useState } from "react";
import React from "react";
import { AccordionSection } from "./AccordionSection";

export const ShoppingListAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const shoppingListFakeData = [
    {
      title: "Caesar Salad de luxe",
      items: ["test", "test", "test", "test", "test", "test"],
    },
    {
      title: "Another Item",
      items: ["item1", "item2", "item3"],
    },
    {
      title: "Yet Another Item",
      items: ["itemA", "itemB", "itemC", "itemD"],
    },
  ];
  return (
    <>
      {shoppingListFakeData.map((item, i) => (
        <div className="shoppingliste-info-div" key={i}>
          <AccordionSection
            item={item}
            key={i}
            isActiveSection={activeIndex === i}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            sectionIndex={i}
          />
        </div>
      ))}
    </>
  );
};
