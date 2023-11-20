using AutoMapper;
using myApp.DTOs;
using myApp.Entities;
using myApp.Extensions;

namespace myApp.Helpers
{
    public class AutoMapperProfiles:Profile{
        public AutoMapperProfiles()
        {
            CreateMap<AppUser,MemberDTO>()
            .ForMember(dest=>dest.PhotoUrl,opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
            .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo,PhotoDto>();
            CreateMap<MemberUpdateDTO,AppUser>();
            
        }

    }
}