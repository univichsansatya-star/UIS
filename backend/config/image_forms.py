from django import forms


def image_upload_field(label, dimensions, ratio, validator):
    return forms.ImageField(
        label=f'{label} ({dimensions} px)',
        validators=[validator],
        help_text=(
            f'Wajib tepat {dimensions} px (rasio {ratio}), JPG/PNG/WebP. '
            'Jika berbeda, upload ditolak dan alasannya tampil di bawah field.'
        ),
    )
