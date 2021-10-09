import About from "./About";
import Posts from "./Posts";
import Home from "./Home";
import Post from "./Post";

import { Link, BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <h1><b>React App</b></h1>
      <BrowserRouter>
        <div>
          <Link className="links" to="/"><b>Home</b></Link>
          <Link className="links" to="/About"><b>About</b></Link>
          <Link className="links" to="/Posts"><b>Posts</b></Link><br></br>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/About" component={About} />
          <Route exact path="/Posts/:id" component={Post} />
          <Route exact path="/Posts" component={Posts} />
         
          
          <Route path="/Home">
            <Redirect to="/" />
          </Route>
          <Route path="*" component={Home}></Route>
        </Switch>

      </BrowserRouter>
    </>
  );
}
export default App;