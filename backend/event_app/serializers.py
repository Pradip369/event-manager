from rest_framework import serializers
from .models import EventDetail
from .models import User

class GetUserSerializer(serializers.Serializer):
    start_date_time = serializers.DateTimeField()
    end_date_time = serializers.DateTimeField()

class CreatEventSerializer(serializers.Serializer):
    event_title = serializers.CharField()
    event_start_time = serializers.DateTimeField()
    event_end_time =  serializers.DateTimeField()
    user_list = serializers.ListField()

    def create(self, validated_data):
        request = self.context.get("request")
        event = EventDetail.objects.create(
                user = request.user,
                event_title = validated_data.get('event_title'),
                event_start_time = validated_data.get('event_start_time'),
                event_end_time = validated_data.get('event_end_time')
            )
        involved_user = User.objects.filter(id__in = validated_data.get('user_list'))
        event.involved_user.add(*involved_user)
        return event

class UserDetailSerializer(serializers.ModelSerializer):

    is_available = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email','start_date_time', 'end_date_time','is_available']