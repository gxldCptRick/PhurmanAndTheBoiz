using Microsoft.EntityFrameworkCore;
using PhurmanAndTheBoiz.DAL.Models.Entities;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations.Context
{
    internal class UserContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }

        public UserContext(DbContextOptions options) : base(options) { }
    }
}
