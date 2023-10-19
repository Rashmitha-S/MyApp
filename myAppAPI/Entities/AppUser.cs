

namespace myApp.Entities
{
    public class AppUser
    {
       // internal byte[] passwordHash;

        public int Id{get;set;}

 
        public string UserName {get;set;}
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
