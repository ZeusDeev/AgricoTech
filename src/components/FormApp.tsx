import React, { useState } from "react";
import Plot from "react-plotly.js";
import "../styles/AppStyles.css"; // Archivo CSS separado

const FormApp: React.FC = () => {
  const [tamanio, setTamanio] = useState('');
  const [suelo, setSuelo] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [prediccion, setPrediccion] = useState<number | null>(null);
  const [dataPoints, setDataPoints] = useState<{ x: number; y: number; suelo: string; temperatura: number }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tamanio: Number(tamanio),
        suelo,
        temperatura: Number(temperatura),
      }),
    });

    if (!response.ok) {
      console.error('Error en la solicitud:', response.statusText);
      return;
    }

    const data = await response.json();
    setPrediccion(data.prediccion);

    setDataPoints((prevData) => [
      ...prevData,
      { x: Number(tamanio), y: data.prediccion, suelo, temperatura: Number(temperatura) },
    ]);
  };

  const generatePlots = () => {
    if (dataPoints.length === 0) return null;

    const scatterTrace = {
      x: dataPoints.map((point) => point.x),
      y: dataPoints.map((point) => point.y),
      mode: 'markers',
      type: 'scatter',
      name: 'Datos de predicción',
      marker: { size: 10, color: 'red' },
    };

    const sortedData = [...dataPoints].sort((a, b) => a.x - b.x);
    const xValues = sortedData.map((point) => point.x);
    const yValues = sortedData.map((point) => point.y);

    const regressionLine = {
      x: xValues,
      y: yValues,
      mode: 'lines',
      type: 'scatter',
      name: 'Línea de regresión',
      line: { color: 'blue' },
    };

    return {
      scatter: [scatterTrace],
      regression: [scatterTrace, regressionLine],
      layout: {
        xaxis: { title: 'Tamaño del terreno (m²)' },
        yaxis: { title: 'Cantidad de agua (litros)' },
      },
    };
  };

  const plots = generatePlots();

  return (
    <section className="form-section">
      <h2 className="form-title">Predicción de Consumo de Agua</h2>
      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tamaño del terreno (m²):</label>
          <input
            type="number"
            value={tamanio}
            onChange={(e) => setTamanio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de suelo:</label>
          <input
            type="text"
            value={suelo}
            onChange={(e) => setSuelo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Temperatura (°C):</label>
          <input
            type="number"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Predecir</button>
      </form>

      {prediccion !== null && (
        <div className="prediction-result">
          <h3>Predicción: {prediccion.toFixed(2)} litros</h3>
        </div>
      )}

      {plots && (
        <div className="plots-container">
          <h3>Gráfica de Dispersión</h3>
          <Plot data={plots.scatter} layout={{ ...plots.layout, title: 'Dispersión de Datos' }} style={{ width: '100%', height: '400px' }} />
          <h3>Gráfica de Regresión Lineal</h3>
          <Plot data={plots.regression} layout={{ ...plots.layout, title: 'Regresión Lineal' }} style={{ width: '100%', height: '400px' }} />
        </div>
      )}
    </section>
  );
};

export default FormApp;