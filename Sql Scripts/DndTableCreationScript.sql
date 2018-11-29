--drop database DndTest;
--drop database DndUsers;

use master;
 create database DndTest;
 create database DndUsers;
go
use DndTest;
Create table Users(
Id int Identity(1,1) not null,
FirstName varchar(55) not null,
LastName varchar(55) not null,
Username varchar(55) not null,
PasswordHash varbinary(64) not null,
PasswordSalt varbinary(128) not null
);
go 
use DndUsers;
Create table Users(
Id int Identity(1,1) not null,
FirstName varchar(55) not null,
LastName varchar(55) not null,
Username varchar(55) not null,
PasswordHash varbinary(64) not null,
PasswordSalt varbinary(128) not null);