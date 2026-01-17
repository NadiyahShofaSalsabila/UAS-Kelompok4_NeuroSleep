import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

# --- Load environment variables ---
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USERNAME", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_DATABASE", "neurosleep")

# --- Koneksi Database ---
def get_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

# --- Inisialisasi Database dan Tabel ---
def init_db():
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD
        )
        c = conn.cursor()
        c.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.commit()
        conn.close()

        conn = get_connection()
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE,
                password VARCHAR(100),
                role VARCHAR(20)
            )
        ''')
        c.execute("SELECT * FROM users WHERE username = 'admin'")
        if not c.fetchone():
            c.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)",
                      ('admin', 'admin123', 'admin'))
        conn.commit()
        conn.close()

        conn = get_connection()
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS sleep_predictions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                gender VARCHAR(10),
                age FLOAT,
                sleep_duration FLOAT,
                quality_of_sleep INT,
                physical_activity INT,
                stress_level INT,
                heart_rate INT,
                daily_steps INT,
                systolic_bp INT,
                diastolic_bp INT,
                bmi_category VARCHAR(50),
                occupation VARCHAR(100),
                prediction VARCHAR(100)
            )
        ''')
        conn.commit()
        conn.close()

    except Error as e:
        print("Error saat inisialisasi database:", e)


# --- LOGIN ---
def check_user(username, password):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = c.fetchone()
    conn.close()
    return user

# --- REGISTER ---
def register_user(username, password):
    conn = get_connection()
    c = conn.cursor()
    try:
        c.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)",
                  (username, password, 'user'))
        conn.commit()
        return True
    except mysql.connector.IntegrityError:
        return False
    finally:
        conn.close()

# --- SAVE PREDICTION ---
def save_prediction(data):
    conn = get_connection()
    c = conn.cursor()
    c.execute('''
        INSERT INTO sleep_predictions (
            name, gender, age, sleep_duration, quality_of_sleep, physical_activity, stress_level,
            heart_rate, daily_steps, systolic_bp, diastolic_bp, bmi_category, occupation, prediction
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', data)
    conn.commit()
    conn.close()

# --- GET SEMUA PREDIKSI ---
def get_all_predictions():
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT * FROM sleep_predictions ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    return rows

# --- HAPUS SATU DATA ---
def delete_prediction(id):
    conn = get_connection()
    c = conn.cursor()
    c.execute('DELETE FROM sleep_predictions WHERE id=%s', (id,))
    conn.commit()
    conn.close()

# --- HAPUS SEMUA DATA ---
def delete_all_predictions():
    conn = get_connection()
    c = conn.cursor()
    c.execute('DELETE FROM sleep_predictions')
    conn.commit()
    conn.close()
