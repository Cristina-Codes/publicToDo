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
  const [addedToDo, setAddedToDo] = useState([]);
  const [dayRef, setDayRef] = useState();
  const [when, setWhen] = useState();

  const dayPrefix = day.split("").splice(0, 3).join("");

  const handleInput = (e) => {
    e.preventDefault();

    const toDo = e.target.parentNode[0].value;
    const when = e.target.parentNode[1].value;
    const whitespaceCheck = /(?!^\s+$)^.*$/m;

    if (toDo.match(whitespaceCheck) !== null) {
      const dayId = e.target.parentNode[0].id;
      setDayRef(dayId);

      const newTask = [toDo, false];
      setAddedToDo(newTask);
      setWhen(when);

      e.target.parentNode[0].value = "";
    } else {
      alert("Please enter a task.");
    }
  };

  useEffect(() => {
    const db = getDatabase(firebase);
    const thisDay = ref(db, `/${dayRef}/${when}`);

    push(thisDay, addedToDo);
  }, [addedToDo]);

  return (
    <div className="day" id={day}>
      <form className="addToDo">
        <label htmlFor={dayPrefix}>{day}</label>
        <textarea type="text" id={dayPrefix} />

        <select>
          {dayPrefix !== "Any" ? (
            <>
              <option value="Weekly">Weekly</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </>
          ) : null}
          <option value="Anytime">Anytime</option>
        </select>

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
