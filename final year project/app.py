from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/try', methods=['POST'])
def try_it_out():
    user_input = request.form.get('user_input')
    uploaded_file = request.files.get('file')

    if user_input:
        processed_text = process_text(user_input)
        return processed_text

    if uploaded_file:
        if uploaded_file.filename.endswith(('csv', 'xlsx')):
            df = pd.read_csv(uploaded_file) if uploaded_file.filename.endswith('csv') else pd.read_excel(uploaded_file)
            processed_data = process_data(df)
            return processed_data.to_html()  # Assuming you want to return HTML representation of processed data
        else:
            return jsonify({'error': 'Please upload a CSV or XLSX file.'}), 400

    return jsonify({'error': 'No user input or file provided.'}), 400

def process_text(text):
    # Process user input (example)
    return jsonify({'result': text.upper()})

def process_data(df):
    # Process uploaded data (example)
    return df.describe()

if __name__ == '__main__':
    app.run(debug=True)
