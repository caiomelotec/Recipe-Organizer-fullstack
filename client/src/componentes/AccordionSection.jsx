import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const AccordionSection = ({
  item,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}) => {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };
  return (
    <>
      <div className="shoppinglist-title" onClick={toggleSection}>
        <h4>{item.title}</h4>
        {isActiveSection ? (
          <AiOutlineMinus className="shoppinglist-arrow-icon" size={22} />
        ) : (
          <AiOutlinePlus className="shoppinglist-arrow-icon" size={20} />
        )}
      </div>
      {isActiveSection && (
        <div className="shoppinglist-list">
          <ul>
            {item.items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
