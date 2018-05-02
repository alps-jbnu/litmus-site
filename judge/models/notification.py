from django.core.cache import cache
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _

from judge.models.contest import Contest
from judge.models.profile import Profile

__all__ = ['Notification']


class Notification(models.Model):
    user = models.ForeignKey(Profile, verbose_name=_('commenter'))
    time = models.DateTimeField(verbose_name=_('posted time'), auto_now_add=True)
    style = models.CharField(verbose_name=_('class for notification'), max_length=512, blank=True)
    body = models.TextField(verbose_name=_('body of notification'), max_length=8192, blank=False)
    read = models.BooleanField(verbose_name=_('have read'), default=False)

    class Meta:
        permissions = (
            ('see_all_notifications', _('See all notifications')),
            ('send_notification', _('Send notification')),
        )
        verbose_name = _('notification')
        verbose_name_plural = _('notifications')

    def get_absolute_url(self):
        return '#notification-%d' % (self.id)


