# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Entry

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'title', 'description', 'user', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    # def create(self, validated_data):
    #     return Entry.objects.create(user=self.context['request'].user, **validated_data)