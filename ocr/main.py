import json

from db import Db
from ocr import Ocr
from rabbitmq import RabbitProvider

if __name__ == '__main__':
    db = Db("127.0.0.1", 3306, "root", "root", "ocr")
    rabbit = RabbitProvider("localhost", 5672, "scoring")

    # TODO: Listen to queue, and see whether got new pdf come in or not

    file = "F:\\chartnexus\\project_dev\\AR-QR-Part-B\\sample\\1.pdf"
    folder = "F:\\chartnexus\\project_dev\\AR-QR-Part-B\\output\\1"

    print(f"start ocr for file: {file}")
    ocr = Ocr(file, folder, db.engine)
    file = ocr.run()
    print("ocr done")
    rabbit.publish(json.dumps(file))
    print(f"published work {file}")
