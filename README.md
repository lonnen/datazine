# datazine: inexpensive data publishing as a webapp

datazine is a small webapp for exploring a database and sharing the resulting
queries. It's written in Python, using Flask, and designed for PostgreSQL by
default.

## Getting Started

1. `pip install -r requirements`
2. cp settings.py-dist settings.py
3. edit settings.py
4. create the `publisher` user in your database
5. from the project root, run a python shell and enter `from datazine import init_db; init_db()`
