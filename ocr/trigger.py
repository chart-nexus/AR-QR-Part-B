import argparse
import json
import os
import sys

p = os.path.abspath('..')
sys.path.insert(1, p)

from rabbitmq import RabbitProvider

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-folder', required=True, type=str)

    args = parser.parse_args()
    folder = args.folder

    if not os.path.isdir(folder):
        print("args is not file")
        exit(0)

    rabbit_publisher = RabbitProvider("localhost", 5672, "ocr")
    for file in os.listdir(folder):
        f = os.path.join(folder, file)


        data = {"file": f}
        rabbit_publisher.publish(json.dumps(data))
