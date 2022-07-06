// Firebase
import firebase from "../firebase";
// Modules
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove, get, set } from "firebase/database";
// Styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const List = ({ dayPrefix }) => {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebase);
    const database = ref(db, `/${dayPrefix}`);

    onValue(database, (response) => {
      const data = response.val();
      const toDoArray = [];

      for (let key in data) {
        toDoArray.push({ key: key, item: data[key] });
      }

      setToDos(toDoArray);
    });
  }, []);

  const handleClick = (dayPrefix, itemKey) => {
    const db = getDatabase(firebase);
    const itemRef = ref(db, `/${dayPrefix}/${itemKey}`);

    remove(itemRef);
  };

  const handleCheck = (dayPrefix, itemKey) => {
    const db = getDatabase(firebase);
    const itemRef = ref(db, `/${dayPrefix}/${itemKey}`);

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
    <div className="list" id={`${dayPrefix}List`}>
      {toDos.map((toDo) => {
        const itemKey = toDo.key;

        return (
          <div className="toDoItem" key={itemKey}>
            <form className="iconContainer">
              <label htmlFor={itemKey} className="sr-only">
                Checkbox for {toDo.item}
              </label>

              <input
                type={"checkbox"}
                id={itemKey}
                onChange={() => {
                  handleCheck(dayPrefix, itemKey);
                }}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => {
                  handleClick(dayPrefix, itemKey);
                }}
              />
            </form>
            <p>{toDo.item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
