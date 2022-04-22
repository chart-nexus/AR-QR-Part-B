import pytesseract


class OcrService:
    def __init__(self):
        pass

    def image_to_text(self, image):
        return pytesseract.image_to_string(image)
