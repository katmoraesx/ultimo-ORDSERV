from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Campos removidos: is_chef, is_manutentor, is_administrador
    pass
