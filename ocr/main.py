import json
import os
import sys

p = os.path.abspath('..')
sys.path.insert(1, p)

from db import Db
from ocr import Ocr
from rabbitmq import RabbitProvider, RabbitConsumer


def create_dir_if_not_exists(path):
    if not os.path.isdir(path):
        os.makedirs(path, exist_ok=True)


def get_filename_from_full_path(path):
    file_with_ext = os.path.basename(path)
    return file_with_ext[:file_with_ext.rindex(".")]


if __name__ == '__main__':
    db = Db("127.0.0.1", 3306, "root", "root", "ocr")
    rabbit_publisher = RabbitProvider("localhost", 5672, "scoring")
    rabbit_consumer = RabbitConsumer("localhost", 5672, "ocr")

    base_path = ""
    create_dir_if_not_exists(base_path)


    def callback(ch, method, properties, body):
        data = json.loads(body)
        file = data["file"]
        filename = get_filename_from_full_path(file)
        folder = os.path.abspath(os.path.join(base_path, filename))
        print(folder)
        create_dir_if_not_exists(folder)

        print(f"start ocr for file: {file}")
        ocr = Ocr(file, folder, db.engine)
        file = ocr.run()
        print("ocr done")
        rabbit_publisher.publish(json.dumps(file))
        print(f"published work {file}")
        ch.basic_ack(delivery_tag=method.delivery_tag)  # tell queue success

    print("listening to rabbitmq...")
    rabbit_consumer.set_callback(callback)
