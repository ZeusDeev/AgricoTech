import React from "react";
import "../styles/AppStyles.css";


const Proyecto: React.FC = () => {
  return (
    

    <section className="Proyecto img--banner">
    
      <div className="contenido-proyecto overlay">

        <h2>¿De qué va este proyecto?</h2>
        <p>
          Este proyecto tiene como objetivo predecir la cantidad de agua que se necesita para un terreno de siembra
          basándose en el tamaño del terreno, el tipo de suelo y la temperatura.

          Con cada gota optimizada gracias a la predicción, cultivamos un futuro sostenible donde el agua riega la vida, no el desperdicio
        </p>

        <div className="buttom">
          <a href="#">Arranquemos</a>
        </div>
      </div>

      

    </section>
  );

};

export default Proyecto;