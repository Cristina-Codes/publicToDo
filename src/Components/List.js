// Firebase
import firebase from "../firebase";
// Modules
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
// Styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const List = ({ dayPrefix }) => {
  const [toDos, setToDos] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebase);
    const database = ref(db, `/${dayPrefix}`);
    const checkedItems = JSON.parse(localStorage.getItem("checked"));
    // setCheckedKeys(checkedItems);

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
    setCheckedKeys((prev) =>
      prev.map((key) => {
        if (itemKey !== key) {
          return key;
        }
      })
    );
  };

  const handleCheck = (e, itemKey) => {
    const isItChecked = e.target.checked;

    if (isItChecked) {
      const updateThis = updatingKeys();
      updateThis.push(itemKey);

      localStorage.setItem("checked", JSON.stringify(updateThis)); //only adds the latest one rather than appending on
      // I need to be updating an object/array that gets set to key "checked"
    } else {
      setCheckedKeys((prev) =>
        prev.map((key) => {
          if (itemKey !== key) {
            return key;
          }
        })
      );
    }
  };

  const updatingKeys = () => {
    if (checkedKeys === null) {
      return [];
    } else {
      return [...checkedKeys];
    }
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
              {/* {
                  checkedKeys.forEach((key) => {
                    console.log(key);
                  }) 
                  // ? 
                  // <input 
                  //   type={"checkbox"} 
                  //   id={itemKey} 
                  //   onClick={(e) => {handleCheck(e, itemKey)}} 
                  //   defaultChecked
                  // />
                  // :
                } */}
              <input
                type={"checkbox"}
                id={itemKey}
                onClick={(e) => {
                  handleCheck(e, itemKey);
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
