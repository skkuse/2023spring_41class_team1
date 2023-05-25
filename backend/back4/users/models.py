from django.db import models

    
class back4Model(models.Model):
    index = models.IntegerField()
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
    # 필요한 추가 필드 정의

    def __str__(self):
        return self.name
