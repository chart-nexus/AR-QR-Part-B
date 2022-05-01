import json

from db import Db
from ocr import Ocr
from rabbitmq import RabbitProvider

if __name__ == '__main__':
    db = Db("127.0.0.1", 3306, "root", "root", "ocr")
    rabbit = RabbitProvider("localhost", 5672, "scoring")

    file = "C:\\Users\\draden\\Desktop\\test\\mmh-ar-2018.pdf"
    folder = "C:\\Users\\draden\\Desktop\\test\\ot"

    print(f"start ocr for file: {file}")
    ocr = Ocr(file, folder, db.engine)
    file = ocr.run()
    print("ocr done")
    rabbit.publish(json.dumps(file))
    print(f"published work {file}")
