import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError, transaction
from django.db.models import F
from django.forms.models import ModelForm
from django.http import HttpResponseForbidden, HttpResponseBadRequest, HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, get_list_or_404
from django.utils.translation import ugettext as _
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, UpdateView
from reversion import revisions
from reversion.models import Version

from judge.dblock import LockModel
from judge.models import Notification
from judge.utils.views import TitleMixin
from judge.widgets import MathJaxPagedownWidget

__all__ = ['read_notification', 'get_notification', 'get_list_json']

@csrf_exempt
@login_required
def read_notification(request):
    if request.method != 'POST':
        return HttpResponseForbidden()

    if 'id' not in request.POST or not request.POST['id'].isdigit():
        return HttpResponseBadRequest()

    notification_id = int(request.POST['id'])
    try:
        notification = get_object_or_404(Notification, id=notification_id, user=request.user.profile)
        if notification is None:
            return JsonResponse({'id': notification_id, 'result': False}, safe=False)
    except:
        return JsonResponse({'id': notification_id, 'result': False}, safe=False)
        
    notification.read = True
    notification.save(update_fields=['read'])

    return JsonResponse({'id': notification_id, 'result': True}, safe=False)

def get_notification(request, read=None):
    try:
        if read is None:
            notifications = get_list_or_404(Notification, user=request.user.profile)
        else:
            notifications = get_list_or_404(Notification, user=request.user.profile, read=read)

        ret = []
        for noti in notifications:
            item = {}
            item['id'] = noti.id
            item['user'] = noti.user.user.username
            item['read'] = noti.read
            item['body'] = noti.body
            item['time'] = noti.time
            ret.append(item)       
        return ret
    except:
        return []

@login_required
def get_list_json(request):
    if request.GET.get('unread') is not None:
        ret = get_notification(request, request.GET['unread'] == 'n')
    else:
        ret = get_notification(request)
    return JsonResponse(ret, safe=False)

