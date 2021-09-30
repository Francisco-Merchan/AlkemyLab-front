import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CreateOperation from "./pages/createOperations";
import HomePage from "./pages/homePage";
import Edit from "./pages/edit";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create" exact component={CreateOperation} />
        <Route path="/edit/:id" exact component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
