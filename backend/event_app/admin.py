from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User,EventDetail
from django.contrib import admin

class CustomUserAdmin(UserAdmin):
    """Define admin model for custom User model with no username field."""
    fieldsets = (
        (None, {'fields': ('username','email','password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Event Info'), {'fields': ('start_date_time', 'end_date_time')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2',"start_date_time","end_date_time"),
        }),
    )
    list_display = ('id','username', 'email', 'start_date_time', 'end_date_time', 'is_staff')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('id',)
    filter_horizontal = ('groups', 'user_permissions',)
    list_display_links = list_display

admin.site.register(User,CustomUserAdmin)

@admin.register(EventDetail)
class EventDetailAdmin(admin.ModelAdmin):
    list_display= ["id","user","event_title","event_start_time","event_end_time"]
    search_fields=["id","event_title"]
    list_per_page = 10
    list_filter = ["event_start_time","event_end_time"]
    list_display_links = list_display