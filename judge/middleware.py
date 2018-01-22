from django.shortcuts import redirect
from django.core.urlresolvers import reverse

class ContestMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            profile = request.user.profile
            profile.update_contest()
            request.participation = profile.current_contest
            request.in_contest = request.participation is not None
        else:
            request.in_contest = False
            request.participation = None
        return self.get_response(request)


class UserActivateMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            profile = request.user.profile
            current_path = request.path
            activate_path = reverse('user_activate_profile')

            feel_free_on = [
                activate_path,
                '/admin',
                reverse('auth_logout')
            ]

            def is_available(path):
                for ok in feel_free_on:
                    if path.startswith(ok):
                        return True
                return False

            need_to_activate = not profile.student_id or not profile.name

            if need_to_activate and not is_available(current_path):
                return redirect(activate_path)
        else:
            pass
        return self.get_response(request)
