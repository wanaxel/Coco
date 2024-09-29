from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'your-secret-key'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'axel'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'test'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM user_table WHERE username = %s', (username,))
        user = cursor.fetchone()

        if not user or user[2] != password:  
            flash('Invalid username/password.', 'error')
        else:
            session['username'] = username
            flash('Login successful!', 'success')
            return redirect(url_for('portal'))

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        if not username or not email or not password:
            flash('Please fill out all fields', 'error')
            return render_template('register.html')

        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM user_table WHERE username = %s OR email = %s', (username, email))
        existing_user = cursor.fetchone()

        if existing_user:
            flash('Username/email already exists, please choose a different one', 'error')
            return render_template('register.html')

        cursor.execute('INSERT INTO user_table (username, email, password) VALUES (%s, %s, %s)',
                       (username, email, password))
        mysql.connection.commit()

        flash('Registration successful!', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/portal')
def portal():
    if 'username' in session:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT email FROM user_table WHERE username = %s', (session['username'],))
        email = cursor.fetchone()[0]
        return render_template('portal.html', username=session['username'], email=email)
    return redirect(url_for('index'))


@app.route('/difficulty', methods=['GET', 'POST'])
def difficulty():
    return render_template('difficulty.html')

@app.route('/dashboardbeginner', methods=['GET','POST'])
def dashboardbeginner():
    return render_template('dashboardbeginner.html')


@app.route('/dashboardintermediate', methods=['GET','POST'])
def dashboardintermediate():
    return render_template('dashboardintermediate.html')

@app.route('/dashboardexpert', methods=['GET','POST'])
def dashboardexpert():
    return render_template('dashboardexpert.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if 'username' in session:
        if request.method == 'POST':
            current_username = session['username']
            new_username = request.form['username']
            new_email = request.form['email']
            new_password = request.form['password']

            cursor = mysql.connection.cursor()
            cursor.execute('UPDATE user_table SET username = %s, email = %s, password = %s WHERE username = %s',
                           (new_username, new_email, new_password, current_username))
            mysql.connection.commit()

            session['username'] = new_username

            flash('Profile updated successfully!', 'success')
            return redirect(url_for('profile'))
        else:
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT username, email FROM user_table WHERE username = %s', (session['username'],))
            user = cursor.fetchone()
            return render_template('profile.html', username=user[0], email=user[1])
    return redirect(url_for('login'))


@app.route('/easy')
def easy():
    return render_template('easy.html')

@app.route('/intermediate')
def intermediate():
    return render_template('intermediate.html')

@app.route('/expert')
def expert():
    return render_template('expert.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
