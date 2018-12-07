using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhurmanAndTheBoiz.DAL.Models.Entities
{
    internal class UserEntity
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string Id { get; set; }

        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 2, ErrorMessage = "We Need A Name That Is At least 2 Characters Long And Less than 55 Characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 2, ErrorMessage = "We Need A Name That Is At least 2 Characters Long And Less than 55 Characters.")]
        public string LastName { get; set; }

        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 2, ErrorMessage = "We Need A Name That Is At least 2 Characters Long And Less than 55 Characters.")]
        public string Username { get; set; }

        [Required]
        [MaxLength(64, ErrorMessage = "Password hash is not the expected length.")]
        [MinLength(64, ErrorMessage = "Password hash is not the expected length.")]
        public byte[] PasswordHash { get; set; }

        [Required]
        [MaxLength(128, ErrorMessage = "Password salt is not the expected length.")]
        [MinLength(128, ErrorMessage = "Password salt is not the expected length.")]
        public byte[] PasswordSalt { get; set; }


        public List<string> Roles { get; set; }

        public UserEntity()
        {
            Roles = new List<string>();
        }
    }
}
