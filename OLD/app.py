from database import dbInit
import json

with open('config.json','r') as f:
               config = json.load(f)

dbInit.createDatabase(config['sql']);





