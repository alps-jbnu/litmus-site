from django.forms import ModelForm
from django.urls import reverse_lazy
from django.utils.html import format_html
from django.utils.translation import ungettext, ugettext_lazy as _
from reversion.admin import VersionAdmin

from judge.models import Notification
from judge.widgets import HeavySelect2Widget

from django_summernote.widgets import SummernoteWidget


class NotificationForm(ModelForm):
    class Meta:
        widgets = {
            'user': HeavySelect2Widget(data_view='profile_select2'),
        }
        if SummernoteWidget is not None:
            widgets['body'] = SummernoteWidget()


class NotificationAdmin(VersionAdmin):
    fieldsets = (
        (None, {'fields': ('user', 'read', 'body')}),
    )
    list_display = ['user', 'read', 'time', 'body']
    search_fields = ['user__user__username', 'user__name', 'body', 'time']
    actions = []
    actions_on_top = True
    actions_on_bottom = True
    form = NotificationForm
    date_hierarchy = 'time'

    def get_queryset(self, request):
        return Notification.objects.order_by('-time')

    def save_model(self, request, obj, form, change):
        super(NotificationAdmin, self).save_model(request, obj, form, change)

    def get_form(self, request, *args, **kwargs):
        form = super(NotificationAdmin, self).get_form(request, *args, **kwargs)
        # form.base_fields['user'].initial = request.user
        return form

