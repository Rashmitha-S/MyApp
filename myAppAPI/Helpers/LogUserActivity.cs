using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Update.Internal;
using myApp.DTOs;
using myApp.Extensions;
using myApp.Interface;

namespace myApp.Helpers
{
  public class LogUserActivity : IAsyncActionFilter
  {

    public virtual IActionResult Result { get; set; }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      var resultContext = await next();

      if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

      var userId = resultContext.HttpContext.User.GetUserId();

      var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();

      var user = await repo.GetUserByIdAsync(int.Parse(userId));
      user.LastActive = DateTime.UtcNow;
      await repo.SaveChangesAsync();

    }
  }
}
