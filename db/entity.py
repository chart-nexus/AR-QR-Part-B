from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class File(Base):
    __tablename__ = 'file'

    id = Column(Integer, primary_key=True, autoincrement=True)
    folder_location = Column(String)
    file_path = Column(String)


class Page(Base):
    __tablename__ = "page"

    id = Column(Integer, primary_key=True, autoincrement=True)
    file_id = Column(Integer)
    page = Column(Integer)
    orientation = Column(Integer)
    score = Column(Integer)
    sheet = Column(String)
    done_by = Column(String)
    file_path = Column(String)
    status = Column(String)


class Config(Base):
    __tablename__ = "sheet_config"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sheet_name = Column(String)
    threshold = Column(Integer)


class Keyword(Base):
    __tablename__ = "keyword"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sheet_config_id = Column(Integer)
    score = Column(Integer)
