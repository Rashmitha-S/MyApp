using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using myApp.Entities;

namespace myApp.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context){
            if(await context.Users.AnyAsync()) return;

            var UserData=await File.ReadAllTextAsync("Data/UserSeedData.json");

            var option = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var users=JsonSerializer.Deserialize<List<AppUser>>(UserData);

            foreach (var user in users)
            {
                var hmac=new HMACSHA512();

                user.UserName=user.UserName.ToLower();

                user.PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes("pa$$w0rd"));

                user.PasswordSalt=hmac.Key;

                context.Users.Add(user);
                
            }

            await context.SaveChangesAsync();

        }
    }
}
