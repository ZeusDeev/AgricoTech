import React from "react";
import "./styles/AppStyles.css";
import Header from "./components/Header";
import Proyecto from "./components/Proyecto";
import FormApp from "./components/FormApp";

const App: React.FC = () => {
  return (
    <div>
      <Header title="AgricoTech: Cultivando el Futuro" />
      <Proyecto />
      <FormApp />
    </div>
  );
};

export default App;
