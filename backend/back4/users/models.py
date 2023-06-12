from django.db import models
from django.contrib.postgres.fields import ArrayField
    
class back4Model(models.Model):
    main_level = models.IntegerField()
    main_level_tag =models.TextField()
    sub_level = models.IntegerField()
    sub_level_tag = models.TextField()
    problem_idx = models.IntegerField()
    problem_comment = models.TextField()
    input_comment = models.TextField()
    output_comment = models.TextField()
    sample_data = models.TextField()
    chatGPT_output_code = models.TextField()
    hidden_test_case=models.TextField()

    
class userproblem(models.Model):
    
    level = models.TextField()
    number=models.IntegerField()
    accuracy=models.TextField()
    seen = models.TextField()
    error_injection_code=models.TextField()
    problem_id=models.IntegerField()

    
    