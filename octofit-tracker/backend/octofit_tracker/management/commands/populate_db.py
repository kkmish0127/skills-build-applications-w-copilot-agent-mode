from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index({"email": 1}, unique=True)

        # Sample users (super heroes)
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "marvel"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "dc"},
            {"name": "Batman", "email": "batman@dc.com", "team": "dc"},
        ]
        db.users.insert_many(users)

        # Teams
        teams = [
            {"name": "marvel", "members": ["Iron Man", "Captain America"]},
            {"name": "dc", "members": ["Wonder Woman", "Batman"]},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {"user": "Iron Man", "activity": "Running", "duration": 30},
            {"user": "Wonder Woman", "activity": "Cycling", "duration": 45},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"team": "marvel", "points": 100},
            {"team": "dc", "points": 90},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"user": "Batman", "workout": "Strength", "reps": 50},
            {"user": "Captain America", "workout": "Cardio", "reps": 40},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
