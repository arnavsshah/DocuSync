from suggestions import bp


@bp.route('/')
def index():
    return 'Suggestions blueprint'