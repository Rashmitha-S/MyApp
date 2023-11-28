using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using myApp.DTOs;
using myApp.Entities;
using myApp.Helpers;
using myApp.Interface;

namespace myApp.Data
{
    public class UserRepository : IUserRepository
    {
     private readonly DataContext _context;
     private readonly IMapper _mapper;
        public UserRepository(DataContext context,IMapper mapper)
        {
            _context = context;
            _mapper=mapper;
        }

   

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
           return await _context.Users.Include(p=>p.Photos).SingleOrDefaultAsync(x=>x.UserName==username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p=>p.Photos).ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void Update(AppUser user)
        {
            int v = _context.Entry(user).State-EntityState.Modified;
        }

        public async Task<MemberDTO>  GetMemberAsync(string username)
        {
            return await _context.Users.Where(x=>x.UserName==username)
            .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

          public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            var query= _context.Users.AsQueryable();
            query=query.Where(u=>u.UserName!=userParams.CurrentUserName);
            query=query.Where(u=>u.Gender==userParams.Gender);

            var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.maxAge - 1));
            var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.minAge));
            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query=userParams.OrderBy switch{
                "created"=>query.OrderByDescending(u=>u.Created),
                _=>query.OrderByDescending(u=>u.LastActive)
            };
            
            return await PagedList<MemberDTO>.CreateAsync(
            query.AsNoTracking().ProjectTo<MemberDTO>(_mapper.ConfigurationProvider),userParams.PageNumber,userParams.PageSize);
        }
    }
}
