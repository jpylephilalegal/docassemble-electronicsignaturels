from docassemble.base.util import user_info, get_config, url_of, interview_url
import re

__all__ = ['short_url', 'form_email_address']

def short_url():
    info = user_info()
    url = None
    for key, val in get_config('dispatch').iteritems():
        interview_name = re.sub(r'\:([^\/]+)$', r':data/questions/\1', val)
        if interview_name == info.filename:
            url = '%sstart/%s?session=%s' % (url_of('root', _external=True), key, info.session)
            break
    if url is None:
        url = interview_url()
    return url
    
def form_email_address(name, email):
    return '"' + re.sub(r'[^ A-Za-z]', '', unicode(name)) + '"' + " <" + unicode(email) + ">"
