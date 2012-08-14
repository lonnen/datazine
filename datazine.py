"""
datazine -- a sketchbook and micropublishing platform for sql data
"""

import settings

from contextlib import closing
import md5

from flask import abort, Flask, jsonify, redirect, render_template, request, url_for
import psycopg2


app = Flask(__name__)
app.config.from_pyfile('settings.py')

def connect_datastore():
    """Returns a new connection to the datastore, where zines are kept"""
    return psycopg2.connect(
        host = app.config['DATASTORE_HOST'],
        port = app.config['DATASTORE_PORT'],
        dbname = app.config['DATASTORE_NAME'],
        user = app.config['DATASTORE_NAME'],
        password = app.config['DATASTORE_PASS']
    )


def init_db():
    """Creates the database tables.

    intended to be run from a python shell in the root dir:
        >>> from datazine import init_db; init_db();

    """
    with closing(connect_datastore()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().execute(f.read())
        db.commit()


@app.route("/publish", methods=["POST"])
def publish():
    zine = request.form['zine']
    title = request.form.get('title', md5.new(zine).hexdigest())
    with closing(connect_datastore()) as db:
        db.cursor().execute("INSERT INTO zines VALUES (%s, %s);",
                            (title, zine))
        db.commit()
    return jsonify({'url': url_for('zine', title=title, _external=True)})

@app.route("/", methods=["GET"])
def index():
    return render_template("base.html")

@app.route("/<title>", methods=["GET"])
def zine(title):
    with closing(connect_datastore()) as db:
        try:
            cur = db.cursor()
            cur.execute("SELECT * FROM zines where title = %s", (title,))
            title, zine = cur.fetchone()
        except TypeError:
            abort(404)
    return render_template("base.html", title=title, zine=zine)

if __name__ == "__main__":
    app.run(debug=app.config['DEBUG'])
