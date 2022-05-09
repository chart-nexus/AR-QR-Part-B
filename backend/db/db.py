from db import Db

database = Db("127.0.0.1", 3306, "root", "root", "ocr")


def get_db():
    db = database.session_local()
    try:
        yield db
    finally:
        db.close()
