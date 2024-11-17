from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/charter')
def charter():
    return render_template('charter.html')

@app.route('/files/<filename>')
def files(filename):
    return send_from_directory('static/files', filename)

if __name__ == '__main__':
    app.run(debug=True)
