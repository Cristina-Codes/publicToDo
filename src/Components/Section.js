// Firebase
import firebase from "../firebase";
// Modules
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove, set, get } from "firebase/database";
// Styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Section = ({ dayPrefix, title }) => {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebase);
    const database = ref(db, `/${dayPrefix}/${title}`);

    onValue(database, (response) => {
      const data = response.val();
      const toDoArray = [];

      for (let key in data) {
        toDoArray.push({ key: key, item: data[key] });
      }

      setToDos(toDoArray);
    });
  }, []);

  const handleClick = (dayPrefix, title, itemKey) => {
    const db = getDatabase(firebase);
    const itemRef = ref(db, `/${dayPrefix}/${title}/${itemKey}`);

    remove(itemRef);
  };

  const handleCheck = (dayPrefix, title, itemKey) => {
    const db = getDatabase(firebase);
    const itemRef = ref(db, `/${dayPrefix}/${title}/${itemKey}`);

    get(itemRef).then((snapshot) => {
      const data = snapshot.val();
      const theTask = data[0];

      if (data[1] === false) {
        const updatedTask = [theTask, true];
        set(itemRef, updatedTask);
      } else {
        const updatedTask = [theTask, false];
        set(itemRef, updatedTask);
      }
    });
  };

  return (
    <>
      <h3>{title}</h3>
      {toDos.map((toDo) => {
        const itemKey = toDo.key;
        const isChecked = toDo.item[1];

        return (
          <div className="toDoItem" key={itemKey}>
            <form className="iconContainer">
              <label htmlFor={itemKey} className="sr-only">
                Checkbox for {toDo.item}
              </label>

              {isChecked ? (
                <input
                  type={"checkbox"}
                  id={itemKey}
                  onChange={() => {
                    handleCheck(dayPrefix, title, itemKey);
                  }}
                  checked
                />
              ) : (
                <input
                  type={"checkbox"}
                  id={itemKey}
                  onChange={() => {
                    handleCheck(dayPrefix, title, itemKey);
                  }}
                />
              )}

              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => {
                  handleClick(dayPrefix, title, itemKey);
                }}
              />
            </form>
            <p>{toDo.item}</p>
          </div>
        );
      })}
    </>
  );
};

export default Section;
