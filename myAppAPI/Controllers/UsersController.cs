using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApp.Data;
using myApp.DTOs;
using myApp.Entities;
using myApp.Interface;
using SQLitePCL;

namespace myApp.Controllers
{
   //[Authorize]
    // [ApiController]
    // [Route("api/[controller]")]  // /api/Users
    public class UsersController : BaseApiController
    {
       // private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository,IMapper mapper)
        {
           // _context = context;
           _userRepository=userRepository;
           _mapper=mapper;
        }

        // [AllowAnonymous]
        [ActivatorUtilitiesConstructor]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
          
        //     var users = await _context.Users.ToListAsync();
        //    return users;
        //   return Ok(await _userRepository.GetUsersAsync());
            var users = await _userRepository.GetMembersAsync();
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

        [HttpPut("{username}")]
        public async Task<ActionResult<MemberUpdateDTO>> UpdateUser(MemberUpdateDTO memberUpdateDTO,string username){
         //var username=this.use;
         var user=await _userRepository.GetUserByUsernameAsync(username);
         if(username==null) return NotFound();

         _mapper.Map(memberUpdateDTO,user);

         if(await _userRepository.SaveChangesAsync()) return NoContent();

         return BadRequest("Failed to update user");
        }

    }
}
