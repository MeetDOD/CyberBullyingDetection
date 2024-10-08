from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
from flask_cors import CORS

model = load_model('cyberbullying_model.h5')

with open('tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

app = Flask(__name__)
CORS(app)

max_len = 100

@app.route('/')
def index():
    return "About This is simple cyber bullying detection application which is made using python flask and reactjs. This webapp take input from user and analyze it and tell wheather the given description is cyber bullying ot not !"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']

    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=max_len)

    prediction = model.predict(padded_sequence)
    label = int(prediction[0][0] > 0.5)

    return jsonify({'label': label})

if __name__ == '__main__':  
   app.run()