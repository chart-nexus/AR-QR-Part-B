import os

from PIL.Image import Image
from pdf2image import convert_from_path
from pytesseract import pytesseract, Output
from sqlalchemy.orm import sessionmaker

from db import File, Page


def file_as_dict(file):
    return {"id": file.id, "folder_location": file.folder_location, "file_path": file.file_path}


def image_to_txt(image):
    return pytesseract.image_to_string(image)


def rotate_image(image, angle):
    return image.rotate(360 - angle, expand=1)


class Ocr:
    def __init__(self, path, output_folder, engine):
        self.path = path
        self.output_folder = output_folder
        self.tmp_file = "tmp.jpeg"
        self.engine = engine

    def get_session(self):
        db = self.engine.session_local()
        try:
            yield db
        finally:
            db.close()

    def run(self):
        # save to file db
        session = next(self.get_session())
        images = self.pdf_to_images()
        file = File(file_path=self.path, folder_location=self.output_folder, page=len(images))
        session.add(file)
        session.flush()
        for idx, image in enumerate(images):
            page = idx + 1
            orientation = self.detect_orientation(image)
            image = rotate_image(image, orientation)
            txt = image_to_txt(image)
            file_path = self.save_file(txt, page)
            # save to page db
            page_object = Page(file_id=file.id, page=page, orientation=orientation, file_path=file_path)
            session.add(page_object)
            session.flush()
        res = file_as_dict(file)
        session.commit()
        session.close()
        return res

    def pdf_to_images(self):
        return convert_from_path(self.path)

    def save_image_to_tmp(self, image):
        return Image.save(image, self.tmp_file)

    def detect_orientation(self, image):
        self.save_image_to_tmp(image)
        data = pytesseract.image_to_osd(self.tmp_file, output_type=Output.DICT)
        return data["rotate"]

    def save_file(self, txt, page):
        file_name = f"{page}.txt"
        file_path = os.path.join(self.output_folder, file_name)
        f = open(file_path, "w", encoding="utf-8")
        f.write(txt)
        f.close()
        return os.path.abspath(file_path)
