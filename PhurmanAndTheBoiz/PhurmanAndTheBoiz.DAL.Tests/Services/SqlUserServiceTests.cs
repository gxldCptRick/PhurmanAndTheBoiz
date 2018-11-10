using Microsoft.VisualStudio.TestTools.UnitTesting;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services;
using PhurmanAndTheBoiz.DAL.Services.Implementations;

namespace PhurmanAndTheBoiz.DAL.Tests.Services
{
    [TestClass]
    public class SqlUserServiceTests
    {
        private readonly string _username = "The Batman";
        private readonly string _password = "GitGudScrubs";

        [TestMethod]
        public void CreatingAUserReturnsTheCreatedUser()
        {
            // arrange
            var service = GenerateService();
            var oldUserPossibly = service.Authenticate(_username, _password);
            if (oldUserPossibly != null)
            {
                service.Delete(oldUserPossibly.Id);
            }
            var newUser = new User()
            {
                FirstName = "Andres",
                LastName = "Carrera",
                Username = _username,
                Password = _password
            };

            //act
            var userCreated = service.Create(newUser, newUser.Password);

            //assert
            Assert.IsNotNull(userCreated);
        }

        private IUserService GenerateService()
        {
            return new SqlUserService(@"Server=73.20.98.246;Database=DndTest;User Id=dndTest;Password=#NoLifeBrigad3;");
        }

        [TestMethod]
        public void UpdatingAUsersNameUpdatesDatasource()
        {
            //arrange 
            var service = GenerateService();
            var userToUpdate = service.Authenticate(_username, _password);
            var expected = "Carmelo";
            string actual = null;

            //act
            userToUpdate.FirstName = expected;
            service.Update(userToUpdate);
            var freshlyGrabbedUser = service.Authenticate(_username, _password);
            actual = freshlyGrabbedUser.FirstName;

            //assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void AbleToReadAValidRecord()
        {

            //arrange 
            var service = GenerateService();
            var userReading = service.Authenticate(_username, _password);
            User actual = null;

            //act
            actual = service.GetById(userReading.Id);

            //assert
            Assert.IsNotNull(actual);
        }

        [TestMethod]
        public void ReadingAnInvalidRecordReturnsNull()
        {
            //arrange 
            var service = GenerateService();
            User actual = null;
            
            //act
            actual = service.GetById(0);

            //assert
            Assert.IsNull(actual);
        }
    }
}
