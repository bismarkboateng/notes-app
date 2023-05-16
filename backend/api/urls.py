from django.urls import path
from . import views 


urlpatterns = [
    path("todos/", views.TodoListCreate.as_view(), name="list_create"),
    path("todos/<int:pk>", views.TodoRetrieveUpdateDestroy.as_view(), name="retrieve_update_destory"),
    path("todos/<int:pk>/complete", views.TodoToggleComplete.as_view(), name="complete"),
    path("signup/", views.signup, name="sign-up"),
    path("login/", views.login, name="log-in"),
]
