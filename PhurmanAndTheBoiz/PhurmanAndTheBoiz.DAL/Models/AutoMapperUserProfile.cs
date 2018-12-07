using AutoMapper;
using PhurmanAndTheBoiz.DAL.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Models
{
    public class AutoMapperUserProfile : Profile
    {
        public AutoMapperUserProfile()
        {
            CreateMap<UserEntity, User>();
            CreateMap<User, UserEntity>();
        }
    }
}
