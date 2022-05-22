import argparse
import json
import os
import sys

p = os.path.abspath('..')
sys.path.insert(1, p)

from rabbitmq import RabbitProvider

def publish_folder(publisher, dir):
    for f in os.listdir(dir):
        file = os.path.join(dir, f)
        if os.path.isdir(file):
            publish_folder(publisher, file)
        elif file.endswith(".pdf"):
            data = {"file": file}
            publisher.publish(json.dumps(data))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-folder', required=True, type=str)

    args = parser.parse_args()
    folder = args.folder

    if not os.path.isdir(folder):
        print("args is not file")
        exit(0)

    rabbit_publisher = RabbitProvider("localhost", 5672, "ocr")
    publish_folder(rabbit_publisher, folder)
