from django.db import models

class Entry(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
