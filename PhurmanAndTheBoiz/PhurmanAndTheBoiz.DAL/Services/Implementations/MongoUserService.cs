using AutoMapper;
using MongoDB.Driver;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations
{
    public class MongoUserService : IUserManager
    {

        static MongoUserService()
        {
            Mapper.Initialize(config => config.AddProfile<AutoMapperUserProfile>());
        }

        private string _mongoConnectionString;
        private string _database;
        public MongoUserService(string mongoConnectionString, string database)
        {
            _mongoConnectionString = mongoConnectionString;
            _database = database;
        }

        private IMongoCollection<UserEntity> GetUserCollection()
        {
            var client = new MongoClient(_mongoConnectionString);
            return client.GetDatabase(_database).GetCollection<UserEntity>("Users");
        }

        public void AddUserToRole(string userId, string role)
        {
            var users = GetUserCollection();
            var user = users.Find(u => u.Id == userId).FirstOrDefault();
            if (user != null)
            {
                user.Roles = user.Roles ?? new List<string>();
                if (!user.Roles.Contains(role))
                {
                    user.Roles.Add(role);
                    users.ReplaceOne((u) => u.Username == user.Username, user);
                }
            }
        }

        public User AuthenticateUser(string username, string password)
        {
            if (password is null) throw new ArgumentNullException(nameof(password), "Password cannot be null.");
            var users = GetUserCollection();
            var user = users.Find(u => u.Username == username).SingleOrDefault();
            if (user is null) throw new ApplicationException("User Does Not Exist");
            if (!PasswordHasher.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) throw new ApplicationException("Passwords Do Not Match");

            return Mapper.Map<User>(user);
        }

        public User CreateUser(User user, string password)
        {
            var dbUser = Mapper.Map<UserEntity>(user);
            AddPasswordToUser(dbUser, password);
            ValidateUserName(user.Username);
            var users = GetUserCollection();
            users.InsertOne(dbUser);
            dbUser = users.Find(u => u.Username == user.Username).Single();
            return Mapper.Map<User>(dbUser);
        }

        public bool DeleteUser(string id)
        {
            var users = GetUserCollection();
            var us = users.FindOneAndDelete((u) => u.Id == id);
            return !(us is null);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return GetUserCollection().Find(_ => true).ToEnumerable().Select(Mapper.Map<User>);
        }

        public User GetUserById(string id)
        {
            return GetAllUsers().SingleOrDefault(u => u.Id == id);
        }

        public void UpdateUser(User user, string password = null)
        {
            var updatedUser = Mapper.Map<UserEntity>(user);
            var users = GetUserCollection();
            var userInDb = users.Find(u => u.Id == updatedUser.Id).Single();
            updatedUser.Roles = userInDb.Roles;
            ValidateUserName(updatedUser.Username);
            if (password is null)
            {
                updatedUser.PasswordHash = userInDb.PasswordHash;
                updatedUser.PasswordSalt = userInDb.PasswordSalt;
            }
            else
            {
                AddPasswordToUser(updatedUser, password);
            }

            users.ReplaceOne(u => u.Id == updatedUser.Id, updatedUser);
        }

        private void ValidateUserName(string username)
        {
            var users = GetUserCollection();
            if (users.Find(u => u.Username == username).Any())
            {
                throw new ApplicationException("Username must be unique.");
            }
        }

        private void AddPasswordToUser(UserEntity user, string password)
        {
            if (password is null) throw new ArgumentNullException(nameof(password), "Password Cannot be null.");
            PasswordHasher.CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
        }

        public void RemoveUserFromRoll(string userId, string role)
        {
            var users = GetUserCollection();
            var user = users.Find(u => u.Id == userId).FirstOrDefault();
            if (user != null)
            {
                user.Roles = user.Roles ?? new List<string>();
                if (user.Roles.Contains(role))
                {
                    user.Roles.Remove(role);
                    users.ReplaceOne((u) => u.Username == user.Username, user);
                }
            }
        }
    }
}
