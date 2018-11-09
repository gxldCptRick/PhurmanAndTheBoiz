using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Models.Entities;
using PhurmanAndTheBoiz.DAL.Services.Exceptions;
using PhurmanAndTheBoiz.DAL.Services.Implementations.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations
{
    public class SqlUserService : IUserService
    {
        private readonly DbContextOptions _options;

        static SqlUserService()
        {
            Mapper.Initialize((config) =>
            config.AddProfile<AutoMapperUserProfile>());
        }

        public SqlUserService(string connectionString = @"Server=DESKTOP-KAB0VGA\MILOISGREAT;Database=DnDUsers;Trusted_Connection=True;MultipleActiveResultSets=True")
        {
            var builder = new DbContextOptionsBuilder<UserContext>();
            builder.UseSqlServer(connectionString);
            _options = builder.Options;
        }

        public User Authenticate(string username, string password)
        {
            User user = null;
            if (IsValidCredentials(username, password))
            {
                WorkWithConnection((context) =>
                {
                    var userEntity = context.Users.SingleOrDefault((u) => u.Username == username);
                    if (userEntity != null && PasswordHasher.VerifyPasswordHash(password, userEntity.PasswordHash, userEntity.PasswordSalt))
                    {
                        user = Mapper.Map<User>(userEntity);
                    }

                });
            }

            return user;
        }

        public User Create(User user, string password)
        {
            var createdUser = user;
            CheckIfValidPassword(password);
            WorkWithConnection((context) =>
            {
                var userEntity = Mapper.Map<UserEntity>(user);
                CheckIfUsernameIsValid(context, user.Username);
                PasswordHasher.CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
                userEntity.PasswordHash = passwordHash;
                userEntity.PasswordSalt = passwordSalt;
                context.Users.Add(userEntity);
                context.SaveChanges();
                createdUser = Mapper.Map<User>(userEntity);
            });

            return createdUser;
        }

        public void Delete(int id)
        {
            WorkWithConnection((context) =>
            {
                var user = context.Users.FirstOrDefault((u) => u.Id == id);
                if (user != null)
                {
                    context.Users.Remove(user);
                    context.SaveChanges();
                }
            });
        }

        public IEnumerable<User> GetAll()
        {
            var users = new List<User>();

            WorkWithConnection((context) =>
            {
                var usersEntitites = context.Users.ToList();
                foreach (var userEntity in usersEntitites)
                {
                    var mappedUser = Mapper.Map<User>(userEntity);
                    users.Add(mappedUser);
                }
            });

            return users;
        }

        public User GetById(int id)
        {
            User user = null;
            WorkWithConnection((context) =>
            {
                var userEntity = context.Users.FirstOrDefault((u) => u.Id == id);
                user = Mapper.Map<User>(userEntity);
            });
            return user;
        }

        public void Update(User user, string password = null)
        {
            WorkWithConnection((context) =>
            {
                var userEntity = context.Users.FirstOrDefault(u => u.Id == user.Id);
                if (userEntity == null)
                {
                    throw new AppException("User not found");
                }
                else
                {
                    if (user.Username != userEntity.Username && context.Users.Any(u => u.Username == user.Username))
                    {
                        throw new AppException("Username " + user.Username + " is already taken");
                    }

                    userEntity.FirstName = user.FirstName;
                    userEntity.LastName = user.LastName;
                    userEntity.Username = user.Username;

                    if (!string.IsNullOrWhiteSpace(password))
                    {
                        PasswordHasher.CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
                        userEntity.PasswordHash = passwordHash;
                        userEntity.PasswordSalt = passwordSalt;
                    }
                    context.Users.Update(userEntity);
                    context.SaveChanges();
                }
            });

        }

        #region Private Implementations
        private void CheckIfUsernameIsValid(UserContext context, string username)
        {
            if (context.Users.Any(u => u.Username == username)) throw new AppException($"The username {username} is already taken.");
        }

        private void CheckIfValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password)) throw new AppException("The password cannot be null or whitespace.");
        }

        private bool IsValidCredentials(string username, string password)
        {
            return !string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password);
        }

        private void WorkWithConnection(Action<UserContext> unitOfWork)
        {
            using (var context = new UserContext(_options))
            {
                unitOfWork(context);
            }
        }
        #endregion
    }
}
