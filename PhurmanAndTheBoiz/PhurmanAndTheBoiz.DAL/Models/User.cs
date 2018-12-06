using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhurmanAndTheBoiz.DAL.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 2, ErrorMessage = "We need a name that is at least 2 characters long And less than 55 characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 2, ErrorMessage = "We need a name that is at least 2 characters long And less than 55 characters.")]
        public string LastName { get; set; }

        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 1, ErrorMessage = "We need a username that is at least 2 characters long and less than 55 characters.")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(maximumLength: 30, MinimumLength = 8, ErrorMessage = "You must have a password that is shorter than 30 characters and longer than 8 characters.")]
        public string Password { get; set; }

        public List<string> Roles { get; set; }
        public User()
        {
            Roles = new List<string>();
        }

    }
}
