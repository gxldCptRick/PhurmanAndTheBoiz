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
            CreateMap<UserEntity, User>().ForMember(dest => dest.Roles, opts => opts.Ignore());
            CreateMap<User, UserEntity>().ForMember(dest => dest.Roles, opts => opts.Ignore());
            CreateMap<RoleEntity, Role>();
        }
    }
}
