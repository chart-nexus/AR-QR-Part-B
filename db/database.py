from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Db:
    def __init__(self, ip, port, user, password, db):
        self.engine = create_engine(f"mysql://{user}:{password}@{ip}:{port}/{db}")
        self.session_local = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
