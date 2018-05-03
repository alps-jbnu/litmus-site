import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError, transaction
from django.db.models import Q, F
from django.forms.models import ModelForm
from django.http import HttpResponseForbidden, HttpResponseBadRequest, HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.utils import timezone
from django.utils.translation import ugettext as _
from django.urls import reverse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, UpdateView
from reversion import revisions
from reversion.models import Version

from judge.dblock import LockModel
from judge.models import Profile, Contest, ContestParticipation, Organization, Notification
from judge.forms import NewNotificationForm
from judge.utils.views import TitleMixin
from judge.widgets import MathJaxPagedownWidget

__all__ = ['read_notification', 'new_notifications', 'get_notification', 'get_list_json']

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

@login_required
def read_all_notifications(request):
    notifications = Notificaton.objects.filter(user=request.user.profile).all().update(read=True)


def new_notifications(user_list, body, style=None):
    user_list = list(set(user_list))
    print(user_list, body)
    for profile in Profile.objects.filter(user__username__in=user_list).all():
        try:
            notification = Notification(user=profile, body=body, style=style)
            notification.save()
        except:
            return False
    return True

def get_notification(request, read=None, limit=None):
    try:
        if read is None:
            notifications = get_list_or_404(Notification, user=request.user.profile)
        else:
            notifications = get_list_or_404(Notification, user=request.user.profile, read=read)

        more_count = 0
        if limit is not None and len(notifications) > limit:
            more_count = len(notifications) - limit
            notifications = notifications[:limit]

        ret = []
        for noti in notifications:
            item = {}
            item['id'] = noti.id
            item['user'] = noti.user.user.username
            item['read'] = noti.read
            item['style'] = noti.style
            item['body'] = noti.body
            item['time'] = noti.time
            ret.append(item)       

        ret.append({
            'more': more_count
        })

        return ret
    except:
        return []

@login_required
def get_list_json(request):
    limit = None if request.GET.get('limit') is None else int(request.GET.get('limit'))
    if request.GET.get('unread') is not None:
        read = request.GET['unread']=='n'
        ret = get_notification(request, read=read, limit=limit)
    else:
        ret = get_notification(request, limit=limit)
    return JsonResponse(ret, safe=False)

@login_required
def send_notification(request):
    if not request.user.has_perm('judge.send_notification'):
        raise PermissionDenied()

    form = NewNotificationForm()
    profile = request.user.profile
    if request.method == 'POST':
        post = request.POST
        send_to = post.getlist('profiles', [])
        for contest in Contest.objects.filter(key__in=post.getlist('contests')).all():
            send_to += [u.user.user.username for u in contest.users.all()]
        for org in Organization.objects.filter(key__in=post.getlist('organizations')).all():
            send_to += [u.user.username for u in org.members.all()]
        result = new_notifications(send_to, post.get('body'), post.get('style'))
        return HttpResponseRedirect(reverse('notification_send'))

    else:
        users = Profile.objects.order_by('user__username').all()
        now = timezone.now()
        contests = Contest.objects.filter(Q(start_time__lte=now, end_time__gte=now))
        organizations = Organization.objects.all()
        pass

    styles = ['danger', 'dark', 'warning', 'success', 'default']
    styles.sort()

    return render(request, 'notification/send.html', {
        'form': form,
        'title': _('Send notifications'),
        'users': users,
        'contests': contests,
        'organizations': organizations,
        'styles': styles,
    })

@login_required
def my_notification_list(request):
    notifications = Notification.objects.filter(user=request.user.profile).order_by('-time').all()
    notifications.update(read=True)

    return render(request, 'notification/list.html', {
        'title': _('Notifications'),
        'notifications': notifications,
    })
