from forum import bp


@bp.route('/')
def index():
    return 'Forum blueprint'