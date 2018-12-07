﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PhurmanAndTheBoiz.API.Controllers;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services;
using PhurmanAndTheBoiz.DAL.Services.Exceptions;
using System.Collections.Generic;

namespace PhurmaAndTheBoiz.API.Tests.Controllers
{
    [TestClass]
    public class UserControllerTests
    {
        [TestMethod]
        public void AuthenticateReturnsOkWhenCredentialsPass()
        {
            var dependency = new Mock<IUserManager>();
            dependency.Setup(obj => obj.AuthenticateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(new User() { Id =""});
            var controller = new UserController(dependency.Object);
            var result = controller.Authenticate(new UserAuthentication());
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void TheOkReturnedHasANonNullToken()
        {
            var dependency = new Mock<IUserManager>();
            dependency.Setup(obj => obj.AuthenticateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(new User() { Id =""});
            var controller = new UserController(dependency.Object);
            var result = controller.Authenticate(new UserAuthentication());
            Assert.IsNotNull(result);
            if (result is OkObjectResult ok)
            {
                var value = ok.Value;
                var t = value.GetType();
                var member = t.GetProperty("token");
                var token = member.GetValue(value);
                Assert.IsNotNull(token);
            }
            else
            {
                Assert.Fail("the result was not of type OkObjectResult.");
            }
        }

        [TestMethod]
        public void AuthenticationReturnsBadRequestWhenCredentialsFail()
        {
            var dependency = new Mock<IUserManager>();
            dependency.Setup(obj => obj.AuthenticateUser(It.IsAny<string>(), It.IsAny<string>()));
            var controller = new UserController(dependency.Object);
            var result = controller.Authenticate(new UserAuthentication());
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void RegisterReturnsOkayWithGoodCredentials()
        {
            var dependency = new Mock<IUserManager>();
            dependency.Setup(obj => obj.CreateUser(It.IsNotNull<User>(), It.IsNotNull<string>()));
            var controller = new UserController(dependency.Object);
            var result = controller.Register(new User() { Password = "null" });
            Assert.IsInstanceOfType(result, typeof(ObjectResult));
        }

        [TestMethod]
        public void RegisterReturnsBadRequestWhenExceptionIsThrown()
        {
            var dependency = new Mock<IUserManager>();
            dependency.Setup(obj => obj.CreateUser(It.IsNotNull<User>(), It.IsNotNull<string>()))
                .Throws<AppException>();
            var controller = new UserController(dependency.Object);
            var result = controller.Register(new User() { Password = "null" });
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }
    }
}
