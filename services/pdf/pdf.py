from pdf2image import convert_from_path


class PdfService:
    def __init__(self):
        pass

    def pdf_to_images(self, pdf_path):
        return convert_from_path(pdf_path)