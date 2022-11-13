create table if not EXISTS customer(
	CustomerId SERIAL Primary key,
  	firstName varchar(255) NOT NULL,
  	lastName varchar(255) NOT NULL,
  	doB DATE NOT NULL,
  	gender varchar(60) NOT NULL,
  	profession varchar(255),
  	relationshipStart Date,
  	relationshipEnd Date
);

create table if not EXISTS contact(
	Id SERIAL Primary key,
  	CustomerId Integer REFERENCES customer(customerId),
  	ContactType varchar(25) NOT NULL,
  	ContactData Text NOT NULL
);
