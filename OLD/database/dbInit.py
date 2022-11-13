import csv
import json

from sqlalchemy import create_engine


def createDatabase(config):
        with open ('customerData.csv',mode = 'r') as file:
                c_data = csv.DictReader(file)

        

        login_string = "postgresql+psycopg2://%s:%s@%s:%s"%(config['user'],config['password'],config['host'],config['port'])

        e = create_engine(login_string,pool_recycle=3600)
        conn = e.connect();

        conn.execute("create table if not EXISTS customer(\
                        CustomerId SERIAL Primary key,\
                        firstName varchar(255) NOT NULL,\
                        lastName varchar(255) NOT NULL,\
                        doB DATE NOT NULL,\
                        gender varchar(60) NOT NULL,\
                        profession varchar(255),\
                        relationshipStart Date,\
                        relationshipEnd Date\
                ); +\
                create table if not EXISTS contact(\
                        Id SERIAL Primary key,\
                        CustomerId Integer REFERENCES customer(customerId),\
                        ContactType varchar(25) NOT NULL,\
                        ContactData Text NOT NULL\
                );\
                ")


        for customer in c_data:
                names = customer['fullName'].split(" ")
                conn.execute("INSERT INTO customer (insert into customer (customerid,firstName,lastName,dob,gender,relationship) VALUES (%s,'%s','%s','%s','%s')"%customer['id'],names[0],names[1],customer['dateOfBirth'],customer['relationship'])

                


                

        