import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Notes from "../Routes/Notes";
import Note from "../Routes/Note";
import Add from "../Routes/Add";
import Edit from "../Routes/Edit";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={Notes} />
        <Route path={"/add"} component={Add} />
        <Route path={"/:id"} exact component={Note} />
        <Route path={"/:id/Edit"} component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
