using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApp.Data;
using myApp.DTOs;
using myApp.Entities;
using myApp.Extensions;
using myApp.Helpers;
using myApp.Interface;
using SQLitePCL;

namespace myApp.Controllers
{
  [Authorize]
    // [ApiController]
    // [Route("api/[controller]")]  // /api/Users
    public class UsersController : BaseApiController
    {
       // private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository,IMapper mapper,IPhotoService photoService)
        {
           // _context = context;
           _userRepository=userRepository;
           _mapper=mapper;
           _photoService=photoService;
        }

        // [AllowAnonymous]
        [ActivatorUtilitiesConstructor]
        [HttpGet]

        public async Task<ActionResult<PagedList<MemberDTO>>> GetUsers([FromQuery]UserParams userParams,string username)
        {
          var CurrentUser = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            //var CurrentUser=await _userRepository.GetUserByUsernameAsync(username);
            userParams.CurrentUserName=CurrentUser.UserName;

            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender=CurrentUser.Gender=="male"?"female":"male";
            }
          
        //     var users = await _context.Users.ToListAsync();
        //    return users;
        //   return Ok(await _userRepository.GetUsersAsync());
            var users = await _userRepository.GetMembersAsync(userParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage,users.PageSize,
            users.TotalCount,users.TotalPages));
           // var usersToReturn=_mapper.Map<IEnumerable<MemberDTO>>(users);
            return Ok(users);
          
        }
        [ActivatorUtilitiesConstructor]
        [HttpGet("{username}")]

        public async  Task<ActionResult<MemberDTO>> getUser(string username)
        {
           // return await _context.Users.FindAsync(id);
           //var user= await _userRepository.GetUserByUsernameAsync(username);
           return await _userRepository.GetMemberAsync(username);
           // return _mapper.Map<MemberDTO>(user);
        }

        [HttpPut]
        public async Task<ActionResult<MemberUpdateDTO>> UpdateUser(MemberUpdateDTO memberUpdateDTO){
         //var username=this.use;
         //var user=await _userRepository.GetUserByUsernameAsync(username);
         var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
         //if(username==null) return NotFound();

         _mapper.Map(memberUpdateDTO,user);

         if(await _userRepository.SaveChangesAsync()) return NoContent();

         return BadRequest("Failed to update user");
        }

        [HttpPost("Add-Photo/{username}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file,string username){
         var user=await _userRepository.GetUserByUsernameAsync(username);
         if(user==null) return NotFound();

         var result=await _photoService.AddPhotoAsync(file);

         if(result.Error!=null)return BadRequest(result.Error.Message);

         var photo=new Photo{
            Url=result.SecureUrl.AbsoluteUri,
            PublicId=result.PublicId
         };

         if(user.Photos.Count==0) photo.IsMain=true;
         user.Photos.Add(photo);
         if(await _userRepository.SaveChangesAsync()) {
             return CreatedAtAction(nameof(getUser), new { username = user.UserName },
                _mapper.Map<PhotoDto>(photo));
         }
         return BadRequest("Problem Adding Photo");
        }

        [HttpPut("set-main-photo/{username}/{photoId}")]
        public async Task<ActionResult>SetMainPhoto(int photoId,string username)
    {
       var user=await _userRepository.GetUserByUsernameAsync(username);
       //var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("This is already your main photo");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;
        photo.IsMain = true;

        if (await _userRepository.SaveChangesAsync()) return NoContent();

        return BadRequest("Problem setting main photo");

    }

    [HttpDelete("delete-photo/{username}/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId,string username)
    {
      var user=await _userRepository.GetUserByUsernameAsync(username);
       // var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("You cannot delete your main photo");

        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        user.Photos.Remove(photo);

        if (await _userRepository.SaveChangesAsync()) return Ok();

        return BadRequest("Problem deleting photo");
    }
    }
}
