using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Authenticates and returns the correct user with the given username and password combination.
        /// </summary>
        /// <param name="username">The username for the user</param>
        /// <param name="password">The password for the user</param>
        /// <returns>The User object Associated with the given combo.</returns>
        User AuthenticateUser(string username, string password);

        /// <summary>
        /// Gets all the user accounts.
        /// </summary>
        /// <returns>every user account found.</returns>
        IEnumerable<User> GetAllUsers();

        /// <summary>
        /// Gets a user with the given id.
        /// </summary>
        /// <param name="id">id for the user</param>
        /// <returns></returns>
        User GetUserById(int id);

        /// <summary>
        /// Creates A User with the given User configurations.
        /// It throws the App Exception when given a username already in the database or
        /// when a password is not valid.
        /// </summary>
        /// <exception>App Exception</exception>
        /// <param name="user">The user object that will be added to the database.</param>
        /// <param name="password">The password that will be used to get access to the user.</param>
        /// <returns>The newly created user entry in the database with updated values for the id.</returns>
        User CreateUser(User user, string password);

        /// <summary>
        /// Updates the users data and password. 
        /// the password is defaulted to null.
        /// Throws AppException if the username is already taken or 
        /// if there is no user in the database with the given id.
        /// </summary>
        /// <exception>App Exception</exception>
        /// <param name="user">the user data to be updated</param>
        /// <param name="password">the new password if given</param>
        void UpdateUser(User user, string password = null);

        /// <summary>
        /// Deletes a user with a given id if found.
        /// </summary>
        /// <param name="id">the id of the deleted user</param>
        bool DeleteUser(int id);
    }
}
