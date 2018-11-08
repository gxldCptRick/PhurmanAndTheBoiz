using AutoMapper;
using PhurmanAndTheBoiz.DAL.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserEntity, User>();
            CreateMap<User, UserEntity>();
        }
    }
}
