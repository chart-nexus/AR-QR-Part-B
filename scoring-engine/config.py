import json

from sqlalchemy.orm import sessionmaker

import db.entity


class Keyword:
    def __init__(self, name, score):
        self.name = name
        self.score = score


class Config:
    def __init__(self, sheet_name, threshold, keywords):
        self.sheet_name = sheet_name
        self.threshold = threshold
        self.keywords = keywords


class DbConfigLoader:
    def __init__(self, engine):
        self.session_maker = sessionmaker()
        self.session_maker.configure(bind=engine)

    def load(self):
        session = self.session_maker()
        configs = {}

        file_list = session.query(db.entity.Config).all()

        for file in file_list:
            config = self.__parse_single_config(file)
            configs[config.sheet_name] = config

        return configs

    def __parse_single_config(self, data):
        keywords = [self.__parse_single_keyword(keyword) for keyword in data.keywords]

        return Config(data.sheet_name, data.threshold, keywords)

    def __parse_single_keyword(self, data):
        return Keyword(data.word, data.score)


def validate_not_null(field, field_name):
    if field is None:
        raise Exception(f"field [{field_name}] should not be null!")


class FileConfigLoader:
    def __init__(self):
        self.file = None

    def load(self, file):
        return self.__parse_data(file)

    def __parse_data(self, file):
        with open(file) as f:
            data_list = json.loads(f.read())
        configs = {}

        if type(data_list) is not list:
            raise Exception("Config file should be a json list!")

        for data in data_list:
            config = self.parse_single_config(data)
            configs[config.sheet_name] = config

        return configs

    def __parse_single_config(self, data):
        sheet_name = data["sheet_name"]
        validate_not_null(sheet_name, "sheet_name")

        threshold = data["threshold"]
        validate_not_null(threshold, "threshold")

        if type(threshold) is not int:
            raise Exception("field [threshold] should be an integer")

        keywords = data["keywords"]
        validate_not_null(keywords, "keywords")

        if type(keywords) is not list:
            raise Exception("field [keywords] should be a list")

        config_keywords = []
        for keyword in keywords:
            config_keywords.append(self.__parse_single_keyword(keyword))

        return Config(sheet_name, threshold, config_keywords)

    def __parse_single_keyword(self, data):
        name = data["keyword"]
        validate_not_null(name, "keyword")

        score = data["score"]
        validate_not_null(score, "score")

        if type(score) is not int:
            raise Exception("field [score] should be an integer")

        return Keyword(name, score)
