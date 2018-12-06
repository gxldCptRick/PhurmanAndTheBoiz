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
    public class SqlUserManager : IUserManager
    {
        private readonly DbContextOptions _options;

        static SqlUserManager()
        {
            Mapper.Initialize((config) =>
            config.AddProfile<AutoMapperUserProfile>());
        }

        public SqlUserManager(string connectionString)
        {
            var builder = new DbContextOptionsBuilder<UserContext>();
            builder.UseSqlServer(connectionString);
            _options = builder.Options;
        }

        public Role AddRole(string role)
        {
            var roleSent = new Role();
            WorkWithConnection(context =>
            {
                var roleDb = context.Roles.Add(new RoleEntity() { RoleName = role });
                context.SaveChanges();
                roleSent = Mapper.Map<Role>(roleDb.Entity);
            });

            return roleSent;
        }

        public void AddUserToRole(int userId, int roleId)
        {

            WorkWithConnection(context =>
            {
                var user = context.Users.Single(s => s.Id == userId);
                var role = context.Roles.Single(r => r.Id == roleId);
                user.Roles.Add(role);
                role.Users.Add(user);
                context.SaveChanges();
            });
        }

        public User AuthenticateUser(string username, string password)
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

        public User CreateUser(User user, string password)
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

        public bool DeleteUser(int id)
        {
            var deleted = false;
            WorkWithConnection((context) =>
            {
                var user = context.Users.FirstOrDefault((u) => u.Id == id);
                if (user != null)
                {
                    context.Users.Remove(user);
                    context.SaveChanges();
                    deleted = true;
                }
            });
            return deleted;
        }

        public IEnumerable<User> GetAllUsers()
        {
            var users = new List<User>();

            WorkWithConnection((context) =>
            {
                var usersEntitites = context.Users.ToList();
                foreach (var userEntity in usersEntitites)
                {
                    var mappedUser = Mapper.Map<User>(userEntity);
                    users.Add(mappedUser);
                    foreach (var role in userEntity.Roles)
                    {
                        mappedUser.Roles.Add(role.RoleName);
                    }
                }
            });

            return users;
        }

        public IEnumerable<Role> GetAllRoles()
        {
            var roles = new List<Role>();
            WorkWithConnection(context =>
            {
                foreach (var role in context.Roles)
                {
                    roles.Add(Mapper.Map<Role>(role));
                }
            });

            return roles;
        }

        public User GetUserById(int id)
        {
            var user = GetAllUsers().Single(u => u.Id == id);
            return user;
        }

        public void UpdateUser(User user, string password = null)
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

        public Role GetRoleById(int id)
        {
            var role = default(Role);
            WorkWithConnection(context =>
            {
                var dbRole = context.Roles.SingleOrDefault(r => r.Id == id);
                role = Mapper.Map<Role>(dbRole);
            });

            return role;
        }

        public bool IsUserInRole(int userId, string role)
        {
            var isInRole = false;
            WorkWithConnection(context =>
            {
                var user = context.Users.SingleOrDefault(u => u.Id == userId);
                if (user != null) isInRole = user.Roles.Any(r => r.RoleName == role);
            });
            return isInRole;
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
