import os
import django
os.environ.get("DJANGO_SETTINGS_MODULE","back4.settings")

django.setup()
from users.models import back4Model
import csv

with open('data1.csv', 'r') as tsvfile:
    reader = csv.reader(tsvfile, delimiter='\t')
    for row in reader:
        mymodel = back4Model(index=row[0], main_level=row[1],
                        main_level_tag=row[2],sub_level=row[3],
                        sub_level_tag=row[4],problem_idx=row[5],
                        problem_comment=row[5],input_comment=row[6],
                        output_comment=row[7],sample_data=row[8],
                        chatGPT_output_code=row[9] )
        mymodel.save()