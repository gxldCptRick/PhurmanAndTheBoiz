using PhurmanAndTheBoiz.DAL.Models;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface IUserManager : IUserService
    {
        /// <summary>
        /// Adds a user to a role with the given id.
        /// </summary>
        /// <param name="userId">The user to add the role to</param>
        /// <param name="roleId">The role that will be given</param>
        void AddUserToRole(int userId, int roleId);
        
        /// <summary>
        /// Adds a role to the database and returns the role.
        /// </summary>
        /// <param name="role">newest role to add</param>
        /// <returns>the role id</returns>
        Role AddRole(string role);

        /// <summary>
        /// Returns the roles currently in the database.
        /// </summary>
        /// <returns>all the roles currently added</returns>
        IEnumerable<Role> GetAllRoles();

        /// <summary>
        /// Gets the role associated by the id and if no role is found returns null.
        /// </summary>
        /// <param name="id">the id of the role</param>
        /// <returns>the role if found</returns>
        Role GetRoleById(int id);

        bool IsUserInRole(int userId, string role);
    }
}
