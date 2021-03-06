import os
import sys

p = os.path.abspath('..')
sys.path.insert(1, p)

from config import *
from db import Db, Page, File
from rabbitmq import RabbitConsumer
from scoring_engine import *


def get_session(engine):
    database = engine.session_local()
    try:
        yield database
    finally:
        database.close()


if __name__ == '__main__':
    db = Db("127.0.0.1", 3306, "root", "root", "ocr")
    rabbit = RabbitConsumer("127.0.0.1", 5672, "scoring")

    configLoader = DbConfigLoader(db)
    configs = configLoader.load()
    scoring_engine = ScoringEngine(configs, PageExtractor())

    def callback(ch, method, properties, body):
        data = json.loads(body)
        file_id = data["id"]
        folder = data["folder_location"]
        print(f"processing file {data['file_path']}")
        results = scoring_engine.score_folder(folder)

        session = next(get_session(db))
        for result in results:
            page = session.query(Page).filter_by(file_id=file_id, page=result.page).first()
            page.score = result.score
            page.sheet = result.sheet
            page.done_by = "SYSTEM"
            page.status = result.status
            session.flush()
        file = session.query(File).filter_by(id=file_id).first()
        file.need_verify = len(results) == 0
        file.scoring_done = True
        session.flush()
        session.commit()
        session.close()
        ch.basic_ack(delivery_tag=method.delivery_tag)  # tell queue success
        print("process done")


    rabbit.set_callback(callback)
