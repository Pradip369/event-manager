from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login,logout
from rest_framework.permissions import IsAuthenticated
from .serializers import GetUserSerializer,CreatEventSerializer,UserDetailSerializer
from .models import User
from django.db.models import Case, When, BooleanField,Count,IntegerField,Q
from django.db.models.functions.comparison import Cast
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

class AuthView(APIView):

    def post(self, request, format=None):
        data = request.data
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                token,_ = Token.objects.get_or_create(user=user)
                return Response({'data' : "Login successfully",'token' : str(token)},status=status.HTTP_200_OK)
            else:
                return Response(data = {"User is in-active"},status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(data = {"Invalid username and password"},status=status.HTTP_404_NOT_FOUND)
    
    def put(self,request,format = None):
        Token.objects.filter(user=request.user).delete()
        return Response(data = {"Logout successfully"},status=status.HTTP_200_OK)

class EventManageView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        serializer = GetUserSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            start_date_time = serializer.data.get('start_date_time')
            end_date_time = serializer.data.get('end_date_time')

            users = User.objects.annotate(
                is_available = Case(
                    When(start_date_time__range = [start_date_time,end_date_time],end_date_time__range = [start_date_time,end_date_time],then=True),
                    default=False,
                    output_field=BooleanField(),
                )
            )
            user_serializer = UserDetailSerializer(users,many=True)
        return Response({'user_data' : user_serializer.data},status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = CreatEventSerializer(data = request.data,context = {'request' : request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        else:
            print(serializer.errors)
        return Response(data = {"okokok"},status=status.HTTP_200_OK) 

@api_view(['GET'])
def auth_check(request):
    if request.user.is_authenticated:
        return Response(data = {"authenticated"},status=status.HTTP_200_OK)
    else:
        return Response(data = {"un-authenticated"},status=status.HTTP_200_OK)
