--drop database DndTest;
--drop database DndUsers;

use master;
 create database DndTest;
 create database DndUsers;
go
use DndTest;
Create Table Users(
Id int Identity(1,1) PRIMARY KEY,
FirstName varchar(55) not null,
LastName varchar(55) not null,
Username varchar(55) not null,
PasswordHash varbinary(64) not null,
PasswordSalt varbinary(128) not null
);
go 
Create Table Roles(
Id int Identity(1,1) PRIMARY KEY,
RoleName varchar(55) not null,
)
go

Create Table UserToRoles(
Id int Identity(1,1) PRIMARY KEY,
RoleId int not null FOREIGN KEY REFERENCES Roles(Id),
UserId int not null FOREIGN KEY REFERENCES Users(Id))
go

use DndUsers;
Create Table Users(
Id int Identity(1,1) PRIMARY KEY,
FirstName varchar(55) not null,
LastName varchar(55) not null,
Username varchar(55) not null,
PasswordHash varbinary(64) not null,
PasswordSalt varbinary(128) not null
);
go 
Create Table Roles(
Id int Identity(1,1) PRIMARY KEY,
RoleName varchar(55) not null,
)
go

Create Table UserToRoles(
Id int Identity(1,1) PRIMARY KEY,
RoleId int not null FOREIGN KEY REFERENCES Roles(Id),
UserId int not null FOREIGN KEY REFERENCES Users(Id))
go