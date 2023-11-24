using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApp.Data;
using myApp.DTOs;
using myApp.Entities;
using myApp.Interface;

namespace myApp.Controllers
 {   
   // [Authorize]
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;

        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext context,ITokenService tokenService,
        IMapper mapper)
        {
            _mapper=mapper;
            _tokenService=tokenService;
            _context = context;
        }

        [HttpPost("Register")] //POST: api/account/register?password=Dave&password=pwd
        public async Task<ActionResult<UserDTO>> Register([FromBody]RegisterDTO registerDTO)
        {
            if(await UserExists(registerDTO.Username)) return BadRequest("Username has taken");

            var user=_mapper.Map<AppUser>(registerDTO);

            using var hmac = new HMACSHA512();

       
                user.UserName=registerDTO.Username.ToLower();
                user.PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
                user.PasswordSalt=hmac.Key;
                user.Gender=registerDTO.Gender;
                user.City=registerDTO.City;
                user.Country=registerDTO.Country;
                user.DateOfBirth=registerDTO.DateOfBirth;

          

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDTO
            {
                Username=user.UserName,
                Token=_tokenService.CreateToken(user),
                KnownAs=user.KnownAs
               
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x=>x.UserName==username.ToLower());
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            
            var user = await _context.Users.Include(p=>p.Photos)
            .SingleOrDefaultAsync(x=>x.UserName == loginDTO.UserName);
            
            if(user == null) return Unauthorized();

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.password));

            for(int i=0; i<computedHash.Length;i++){

                if(computedHash[i] != user.PasswordHash[i])
                return Unauthorized("invalid password");
            }

              return   new UserDTO
            {
                Username=user.UserName,
                Token=_tokenService.CreateToken(user),
                 PhotoUrl=user.Photos.FirstOrDefault(x=>x.IsMain)?.Url,
                 KnownAs=user.KnownAs
            };
        }


       
    }
}
