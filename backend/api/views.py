from .serializers import TodoSerializer, TodoToggleCompleteSerializer
from rest_framework import generics, permissions
from todo.models import Todo
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate






class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Todo.objects.filter(created_by=self.request.user).order_by("-created_at")
    

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(created_by=self.request.user)
    


class TodoToggleComplete(generics.UpdateAPIView):
    serializer_class = TodoToggleCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(created_by=self.request.user)

    def perform_update(self, serializer):
        # change the completed field to true / false 
        serializer.instance.completed = not(serializer.instance.completed)
        serializer.save()




@csrf_exempt
def signup(request):
    if request.method == "POST":
        try:
         
         data = JSONParser().parse(request)
         user = User.objects.create_user(username=data["username"], password=data["password"])
         user.save()

         token = Token.objects.create(user=user)
         return JsonResponse({"Token": str(token)}, status=201)
        
        except IntegrityError:
            return JsonResponse({"error": "Username Taken!"}, status=400)



@csrf_exempt
def login(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        user = authenticate(request, username=data["username"], password=data["password"])

        if user is None:
            return JsonResponse({"error": "Unable to login. Make sure your credentials are correct!"}, status=400)
        
        else:
            try:
                token = Token.objects.get(user=user)
                return JsonResponse({"token": str(token)}, status=200)
            except:
                token = Token.objects.create(user=user)
            
            return JsonResponse({"token": str(token)}, status=201)
        