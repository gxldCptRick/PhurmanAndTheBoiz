using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Models.Entities
{
    internal class RoleEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string RoleName { get; set; }

        public virtual List<UserEntity> Users { get; set; }
    }
}
