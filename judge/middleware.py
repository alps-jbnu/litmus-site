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
            activate_path = reverse('user_page')
            # print(profile.student_id)
            if not profile.student_id and current_path != activate_path:
                return redirect(reverse('user_page'))
        else:
            pass
        return self.get_response(request)
