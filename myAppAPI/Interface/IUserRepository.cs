
using myApp.DTOs;
using myApp.Entities;

namespace myApp.Interface
{
    public interface IUserRepository
    {
    void Update(AppUser user);
    Task<bool> SaveChangesAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetUserByIdAsync(int id);
    Task<AppUser> GetUserByUsernameAsync(string username);
    Task<IEnumerable<MemberDTO>> GetMembersAsync();
    // Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
     Task<MemberDTO> GetMemberAsync(string username);
    }
}
