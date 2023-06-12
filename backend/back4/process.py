import pandas as pd
import sqlite3

# Read csv file.
df = pd.read_csv("data2.csv",index_col=0)
df2= pd.read_csv("data3.csv",index_col=0)
# Connect to (create) database.
database = "db.sqlite3"
conn = sqlite3.connect(database)
dtype={
    
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
    "hidden_test_case":"TextField"
}
dtype2={
    "level": "TextField",
    "number":"IntegerField",
    "seen":"TextField",
    "accuracy" : "TextField",
    "error_injection_code" : "TextField",
    "problem_id" : "IntegerField"
}
df.to_sql(name='users_back4model', con=conn, if_exists='replace', dtype=dtype, index=True, index_label="id")
df2.to_sql(name='users_userproblem', con=conn, if_exists='replace', dtype=dtype2, index=True, index_label="id")
conn.close()