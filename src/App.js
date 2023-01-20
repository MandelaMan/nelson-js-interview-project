import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, Switch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import "./css/styles.scss";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <div className="wrapper">
          <Route path="/" exact component={Users} />
          <Route path="/user/:id" exact component={User} />
        </div>
      </Switch>
    </Provider>
  );
}

export default App;
