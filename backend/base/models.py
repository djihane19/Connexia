from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    username= models.CharField(primary_key=True, max_length=50, unique=True)
    bio = models.CharField(max_length=500)
    profile_image = models.ImageField(upload_to='profile_image/',blank=True,null=True)
    followers= models.ManyToManyField("self", symmetrical=False,related_name='following',blank=True)

    def __str__(self):
        return self.username
    

