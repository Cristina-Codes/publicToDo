// Modules
import { useState, useEffect } from "react";
// Styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Component
import List from "./List";

// Firebase
import firebase from "../firebase";

import { getDatabase, ref, push } from "firebase/database";

const Day = ({ day }) => {
  const [addedToDo, setAddedToDo] = useState();
  const [dayRef, setDayRef] = useState();

  const dayPrefix = day.split("").splice(0, 3).join("");

  const handleInput = (e) => {
    e.preventDefault();
    const toDo = e.target.parentNode[0].value;
    const whitespaceCheck = /(?!^\s+$)^.*$/m;

    if (toDo.match(whitespaceCheck) !== null) {
      const dayId = e.target.parentNode[0].id;
      setDayRef(dayId);

      setAddedToDo(toDo);

      e.target.parentNode[0].value = "";
    } else {
      alert("Please enter a task.");
    }
  };

  useEffect(() => {
    const db = getDatabase(firebase);
    const thisDay = ref(db, `/${dayRef}`);

    push(thisDay, addedToDo);
  }, [addedToDo]);

  return (
    <div className="day" id={day}>
      <form className="addToDo">
        <label htmlFor={dayPrefix}>{day}</label>
        <input type="text" id={dayPrefix} />
        <FontAwesomeIcon
          className="button"
          icon={faPlus}
          onClick={handleInput}
        />
      </form>

      <List dayPrefix={dayPrefix} />
    </div>
  );
};

export default Day;
