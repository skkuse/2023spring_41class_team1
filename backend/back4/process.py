
import pandas as pd
import sqlite3

# Read csv file.
df = pd.read_csv("data1.csv")

# Connect to (create) database.
database = "db.sqlite3"
conn = sqlite3.connect(database)
dtype={
    "index": "IntegerField",
    "main_level": "IntegerField",
    "main_level_tag": "TextField", 
    "sub_level": "IntegerField",
    "sub_level_tag": "TextField", 
    "problem_idx": "IntegerField", 
    "problem_comment": "TextField", 
    "input_comment": "TextField", 
    "output_comment": "TextField", 
    "sample_data": "TextField", 
    "chatGPT_output_code": "TextField", 
}
df.to_sql(name='users_back4model', con=conn, if_exists='replace', dtype=dtype, index=True, index_label="id")
conn.close()