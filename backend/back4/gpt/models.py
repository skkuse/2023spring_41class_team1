from django.db import models

# class User(models.Model):

#     class Meta:
#         db_table = 'user'

#     def __str__(self) -> str:
#         return self.user_name

#     user_idx = models.IntegerField(null=False, unique=True)
#     user_name = models.CharField(max_length=100)

# class Problem(models.Model):

#     class Meta:
#         db_table = 'problem'

#     problem_idx = models.IntegerField(null=False, unique=True)
#     main_level = models.IntegerField()
#     main_level_tag = models.CharField(max_length=100)
#     sub_level = models.IntegerField()
#     sub_level_tag = models.CharField(max_length=100)
#     problem_comment = models.CharField(max_length=2000)
#     input_comment = models.CharField(max_length=2000)
#     output_comment = models.CharField(max_length=2000)
#     sample_data = models.JSONField()
#     chatgpt_output_code = models.CharField(max_length=6000)

# class Solution(models.Model):

#     class Meta:
#         db_table = 'solution'

    # problem_idx = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='problem_idx')
    # user_idx = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_idx')
    # solution_code = models.CharField(max_length=6000)
    # execution_time = models.FloatField()
    # memory_usage = models.FloatField()
    # ai_rating = models.IntegerField()
    # Heuristic for estimating solution similarity
    # reduced_solution_embedings = models.JSONField()
