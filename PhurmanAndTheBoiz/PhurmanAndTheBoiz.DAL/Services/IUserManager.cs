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
        void AddUserToRole(string userId, string role);
        void RemoveUserFromRoll(string userId, string role);
    }
}
