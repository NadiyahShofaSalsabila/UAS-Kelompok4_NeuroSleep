from flask import Flask, request, jsonify, session
from flask_cors import CORS
import joblib, numpy as np
from database import init_db, save_prediction, get_all_predictions, delete_prediction, delete_all_predictions, check_user, register_user
from dotenv import load_dotenv
import os

# --- Load environment variables ---
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "supersecretkey")  # fallback ke default jika kosong
CORS(app, supports_credentials=True)

BACKEND_PORT = os.getenv("BACKEND_PORT", 5000)

model = joblib.load('sleep_disorder_model.joblib')
init_db()

# Login
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = check_user(username, password)

    if user:
        session['user_id'] = user[0]
        session['username'] = user[1]
        session['role'] = user[3]
        return jsonify({
            "success": True,
            "username": user[1],
            "role": user[3]
        })
    else:
        return jsonify({
            "success": False,
            "error": "Invalid username or password"
        }), 401

# Logout
@app.route('/api/logout', methods=['POST'])
def api_logout():
    session.clear()
    return jsonify({"success": True, "message": "Logged out successfully"})

# Register user biasa
@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    success = register_user(username, password)

    if success:
        return jsonify({"success": True, "message": "User registered successfully"}), 200
    else:
        return jsonify({"success": False, "error": "Username already exists"}), 200


# Predict
@app.route('/predict', methods=['POST'])
def api_predict():
    if 'role' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        data = request.get_json()

        name = data.get('Name')
        gender = data.get('Gender')
        age = float(data.get('Age'))
        sleep_duration = float(data.get('Sleep Duration'))
        quality_of_sleep = int(data.get('Quality of Sleep'))
        physical_activity = int(data.get('Physical Activity Level'))
        stress_level = int(data.get('Stress Level'))
        heart_rate = int(data.get('Heart Rate'))
        daily_steps = int(data.get('Daily Steps'))
        systolic_bp = int(data.get('Systolic_BP'))
        diastolic_bp = int(data.get('Diastolic_BP'))
        bmi_category = data.get('BMI Category')
        occupation = data.get('Occupation')

        gender_encoded = 1 if gender == "Male" else 0
        bmi_map = {'Overweight': 0, 'Normal': 1, 'Obese': 2}
        bmi_encoded = bmi_map.get(bmi_category, 0)

        occupation_map = {
            'Accountant': 0, 'Doctor': 1, 'Engineer': 2, 'Lawyer': 3, 'Manager': 4,
            'Nurse': 5, 'Sales Representative': 6, 'Salesperson': 7, 'Scientist': 8,
            'Software Engineer': 9, 'Teacher': 10
        }
        occupation_encoded = occupation_map.get(occupation, 0)

        features = [
            gender_encoded, age, occupation_encoded, sleep_duration,
            quality_of_sleep, physical_activity, stress_level, bmi_encoded,
            heart_rate, daily_steps, systolic_bp, diastolic_bp
        ]

        input_data = np.array([features])
        prediction = model.predict(input_data)[0]

        label_map = {1: "No Sleep Disorder", 2: "Sleep Apnea", 0: "Insomnia"}
        result = label_map.get(prediction, "Unknown")

        save_prediction((
            name, gender, age, sleep_duration, quality_of_sleep,
            physical_activity, stress_level, heart_rate, daily_steps,
            systolic_bp, diastolic_bp, bmi_category, occupation, result
        ))

        return jsonify({
            'success': True,
            'prediction': result
        })

    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({'success': False, 'error': str(e)}), 500


# Get all history (only for admin)
@app.route('/history', methods=['GET'])
def get_history():
    if session.get('role') != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    predictions = get_all_predictions()
    result = []
    for row in predictions:
        result.append({
            'id': row[0],
            'name': row[1],
            'gender': row[2],
            'age': row[3],
            'sleep_duration': row[4],
            'quality_of_sleep': row[5],
            'physical_activity': row[6],
            'stress_level': row[7],
            'heart_rate': row[8],
            'daily_steps': row[9],
            'systolic_bp': row[10],
            'diastolic_bp': row[11],
            'bmi_category': row[12],
            'occupation': row[13],
            'prediction': row[14]
        })
    return jsonify(result)


# Delete one record
@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_history(id):
    if session.get('role') != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    delete_prediction(id)
    return jsonify({'message': 'Deleted successfully'})


# Delete all records
@app.route('/delete_all', methods=['DELETE'])
def delete_all_history():
    if session.get('role') != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    delete_all_predictions()
    return jsonify({'message': 'All history deleted'})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=BACKEND_PORT, debug=True)
