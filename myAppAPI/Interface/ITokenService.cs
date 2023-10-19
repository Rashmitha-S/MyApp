using myApp.Entities;

namespace myApp.Interface
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
