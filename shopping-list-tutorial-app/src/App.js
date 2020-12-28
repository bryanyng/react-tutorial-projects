import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { name: "Item 1", quantity: 1, isSelected: false },
    { name: "Item 2", quantity: 1, isSelected: false },
    { name: "Item 3", quantity: 1, isSelected: false },
  ]);

  const [input, setInput] = useState("");

  const [totalCount, setTotalCount] = useState(0);

  const handleAddItem = () => {
    if (input != "") {
      const newItem = {
        name: input,
        quantity: 1,
        isSelected: false,
      };
      const newItems = [...items, newItem];
      setItems(newItems);
      setInput("");
    }
  };

  const addQuantity = (i) => {
    const newItems = [...items];
    newItems[i].quantity += 1;
    setItems(newItems);
    calcTotal();
  };

  const removeQuantity = (i) => {
    if (items[i].quantity != 0) {
      const newItems = [...items];
      newItems[i].quantity -= 1;
      setItems(newItems);
      calcTotal();
    }
  };

  const toggleComplete = (i) => {
    const newItems = [...items];
    newItems[i].isSelected = !newItems[i].isSelected;
    setItems(newItems);
  };

  const calcTotal = () => {
    const totalCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalCount(totalCount);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon icon={faPlus} onClick={() => handleAddItem()} />
        </div>
        <div className="item-list">
          {items.map((item, i) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(i)}>
                {/* HINT: replace false with a boolean indicating the item has been completed or not */}
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.name}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.name}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => removeQuantity(i)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => addQuantity(i)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalCount}</div>
      </div>
    </div>
  );
};

export default App;
