from .serializers import TodoSerializer, TodoToggleCompleteSerializer
from rest_framework import generics, permissions
from todo.models import Todo


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