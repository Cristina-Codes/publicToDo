//Styling
import "./App.scss";

//Components
import Day from "./Components/Day";

const App = () => {
  return (
    <div className="App">
      <header className="wrapper">
        <h1>To Do</h1>
      </header>

      <main className="wrapper memo">
        <Day day={"Monday"} />
        <Day day={"Tuesday"} />
        <Day day={"Wednesday"} />
        <Day day={"Thursday"} />
        <Day day={"Friday"} />
        <Day day={"Saturday"} />
        <Day day={"Sunday"} />
        <Day day={"Anyday"} />
      </main>
      {/* .wrapper .memo END */}
    </div>
  );
};

export default App;
