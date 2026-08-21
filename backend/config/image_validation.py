from django.core.exceptions import ValidationError
from PIL import Image


def validate_dimensions(image, width, height, label):
    try:
        image.seek(0)
        with Image.open(image) as opened_image:
            actual_width, actual_height = opened_image.size
    except (OSError, ValueError) as error:
        raise ValidationError(f'{label}: file gambar tidak valid.') from error

    if (actual_width, actual_height) != (width, height):
        raise ValidationError(
            f'{label}: ukuran wajib {width} x {height} px. '
            f'Ukuran file ini {actual_width} x {actual_height} px.'
        )


def validate_hero_image(image):
    validate_dimensions(image, 1920, 720, 'Hero Slide')


def validate_rector_photo(image):
    validate_dimensions(image, 600, 800, 'Foto Rektor')


def validate_popup_image(image):
    validate_dimensions(image, 1200, 800, 'Popup Announcement')


def validate_faculty_image(image):
    validate_dimensions(image, 800, 500, 'Foto Fakultas')


def validate_accreditation_image(image):
    validate_dimensions(image, 1200, 800, 'Dokumen Akreditasi')


def validate_news_image(image):
    validate_dimensions(image, 1200, 675, 'Cover Berita')


def validate_training_image(image):
    validate_dimensions(image, 1200, 675, 'Foto Pelatihan')


def validate_square_photo(image):
    validate_dimensions(image, 600, 600, 'Foto Profil')


def validate_card_image(image):
    validate_dimensions(image, 1200, 800, 'Foto Kartu')
