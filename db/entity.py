from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class File(Base):
    __tablename__ = 'file'

    id = Column(Integer, primary_key=True, autoincrement=True)
    folder_location = Column(String)
    file_path = Column(String)
    need_verify = Column(Boolean)
    scoring_done = Column(Boolean)

    pages = relationship("Page", back_populates="file")


class Page(Base):
    __tablename__ = "page"

    id = Column(Integer, primary_key=True, autoincrement=True)
    file_id = Column(Integer, ForeignKey("file.id"))
    page = Column(Integer)
    orientation = Column(Integer)
    score = Column(Integer)
    sheet = Column(String)
    done_by = Column(String)
    file_path = Column(String)
    status = Column(String)

    file = relationship("File", back_populates="pages")


class Config(Base):
    __tablename__ = "sheet_config"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sheet_name = Column(String)
    threshold = Column(Integer)
    keywords = relationship("Keyword", back_populates="config")


class Keyword(Base):
    __tablename__ = "keyword"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sheet_config_id = Column(Integer, ForeignKey("sheet_config.id"))
    word = Column(String)
    score = Column(Integer)
    config = relationship("Config", back_populates="keywords")
