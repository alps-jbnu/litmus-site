from django.conf import settings
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.http import urlquote
from django.shortcuts import redirect


class DMOJLoginMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            profile = request.profile = request.user.profile
            login_2fa_path = reverse('login_2fa')
            if (profile.is_totp_enabled and not request.session.get('2fa_passed', False) and
                    request.path != login_2fa_path and not request.path.startswith(settings.STATIC_URL)):
                return HttpResponseRedirect(login_2fa_path + '?next=' + urlquote(request.get_full_path()))
        else:
            request.profile = None
        return self.get_response(request)


class DMOJImpersonationMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_impersonate:
            request.profile = request.user.profile
        return self.get_response(request)


class ContestMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        profile = request.profile
        if profile:
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
                '/accounts'
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
