import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_regression



X, y = make_regression(n_samples=100, n_features=3, noise=0.1)

# Dividir en conjunto de entrenamiento y prueba

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar el modelo de regresión lineal
model = LinearRegression()
model.fit(X_train, y_train)

def predict(data):
    tamanio = float(data['tamanio'])  # Convierte a float
    suelo = data['suelo']
    temperatura = float(data['temperatura'])  # Convierte a float 
    
   
    prediction = tamanio * 0.5  
    return prediction



