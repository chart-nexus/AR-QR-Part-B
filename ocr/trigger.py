import argparse
import json
import os
import sys

p = os.path.abspath('..')
sys.path.insert(1, p)

from rabbitmq import RabbitProvider

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-file', required=True, type=str)

    args = parser.parse_args()

    if not os.path.isfile(args.file):
        print("args is not file")
        exit(0)

    rabbit_publisher = RabbitProvider("localhost", 5672, "ocr")
    data = {"file": "/Users/yinchuangsum/ocr/3.pdf"}

    rabbit_publisher.publish(json.dumps(data))
