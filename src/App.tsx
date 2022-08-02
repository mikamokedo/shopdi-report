import React, { useState } from "react";
import Login from "./containers/Login";
import Main from "./containers/Main";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      {isLogin ? <Main /> : <Login onSuccess={() => setIsLogin(true)} />}
    </div>
  );
}

export default App;
