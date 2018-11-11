
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PhurmanAndTheBoiz.API.Controllers;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services;

namespace PhurmaAndTheBoiz.API.Tests.Controllers
{
    public class TestUserService : IUserService
    {
        public User Authenticate(string username, string password)
        {
            return new User
            {
                Id = 1
            };
        }

        public User Create(User user, string password)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public User GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public void Update(User user, string password = null)
        {
            throw new System.NotImplementedException();
        }
    }

    [TestClass]
    public class UserControllerTests
    {
        [TestMethod]
        public void AuthenticatMethodWorks()
        {
            var controller = new UserController(new TestUserService());
            var result = controller.Authenticate(new User());
            Assert.IsNotNull(result);
        }
    }
}
