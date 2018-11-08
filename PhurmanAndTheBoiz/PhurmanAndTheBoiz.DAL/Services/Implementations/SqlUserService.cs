using Microsoft.EntityFrameworkCore;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services.Implementations.Context;
using System;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations
{
    public class SqlUserService : IUserService
    {
        private readonly DbContextOptions _options;
        public SqlUserService()
        {
            var builder = new DbContextOptionsBuilder<UserContext>();
            builder.UseSqlServer(@"Data Source=DESKTOP-KAB0VGA\MILOISGREAT;initial catalog=DnDUsers;Integrated Security=True; MultipleActiveResultSets=True");
            _options = builder.Options;
        }

        public User Authenticate(string username, string password)
        {
            throw new NotImplementedException();
        }

        public User Create(User user, string password)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(User user, string password = null)
        {
            throw new NotImplementedException();
        }

        private void WorkWithConnection(Action<UserContext> unitOfWork)
        {
            using (var context = new UserContext(_options)){
                unitOfWork(context);
            }
        }
    }
}
