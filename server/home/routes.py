from home import bp


@bp.route('/')
def index():
    return 'Home blueprint'