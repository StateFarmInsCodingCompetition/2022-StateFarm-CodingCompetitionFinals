import csv

class Cache:
        def __init__(self,path):
                self.path = path;
                self.customers = {"0":{}};
                self.buildCache();

        def buildCache(self):
                with open (self.path,mode = 'r') as file:
                        c_data = csv.DictReader(file)
                        self.customers = dict(enumerate(c_data))
                                
            