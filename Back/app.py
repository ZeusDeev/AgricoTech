from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict  

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Permitir todas las solicitudes de cualquier origen


@app.route('/')
def home():
    return "Bienvenido a la API de Predicción de Agua"


@app.route('/predict', methods=['POST'])
def predict_water_need():
    # Obtienee los datos del cuerpo de la solicitud
    data = request.get_json()
    tamanio = data.get('tamanio')  # Esperado como número
    suelo = data.get('suelo')      # Esperado como texto
    temperatura = data.get('temperatura')  # Esperado como número

    if not all([tamanio, suelo, temperatura]):
        return jsonify({'error': 'Faltan datos en la solicitud'}), 400

    # Pasa los datos como un diccionario a la función predict
    prediction = predict({'tamanio': tamanio, 'suelo': suelo, 'temperatura': temperatura})

    return jsonify({'prediccion': prediction})

if __name__ == '__main__':
    app.run(debug=True)
