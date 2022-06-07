from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

class User(AbstractUser):
    start_date_time = models.DateTimeField(null = True,blank = True,verbose_name = "Available start date and time")
    end_date_time = models.DateTimeField(null =True,blank=True,verbose_name = 'Available end date and time')

class EventDetail(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name = "event_held_by",verbose_name="Event held by")
    event_title = models.CharField(max_length=150)
    event_start_time = models.DateTimeField(default=datetime.datetime.now())
    event_end_time = models.DateTimeField()
    involved_user = models.ManyToManyField(to = User)

    def __str__(self):
        return str(self.event_title)