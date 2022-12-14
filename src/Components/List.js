// Components
import Section from "./Section";

const List = ({ dayPrefix }) => {
  return (
    <div className="list" id={`${dayPrefix}List`}>
      {dayPrefix !== "Any" ? (
        <>
          <Section dayPrefix={dayPrefix} title={"Weekly"} />
          <Section dayPrefix={dayPrefix} title={"Morning"} />
          <Section dayPrefix={dayPrefix} title={"Afternoon"} />
          <Section dayPrefix={dayPrefix} title={"Evening"} />
        </>
      ) : null}
      <Section dayPrefix={dayPrefix} title={"Anytime"} />
    </div>
  );
};

export default List;
