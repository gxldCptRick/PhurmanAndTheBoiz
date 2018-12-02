using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Models
{
    public class UserAuthetication
    {
        [Required]
        [StringLength(maximumLength: 55, MinimumLength = 1, ErrorMessage = "We need a username that is at least 2 characters long and less than 55 characters.")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(maximumLength: 30, MinimumLength = 8, ErrorMessage = "You must have a password that is shorter than 30 characters and longer than 8 characters.")]
        public string Password { get; set; }
    }
}
