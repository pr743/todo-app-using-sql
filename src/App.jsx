import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/todo"
          element={<Todo />}
        />

      </Routes>



    </BrowserRouter>
  );
}

export default App;