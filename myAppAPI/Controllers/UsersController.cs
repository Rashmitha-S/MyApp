using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApp.Data;
using myApp.Entities;
using SQLitePCL;

namespace myApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]  // /api/Users
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }
        [ActivatorUtilitiesConstructor]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        [ActivatorUtilitiesConstructor]
        [HttpGet("{id}")]

        public async  Task<ActionResult<AppUser>> getUsersById(int id)
        {
            return await _context.Users.FindAsync(id);

        }

    }
}
