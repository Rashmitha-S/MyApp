using Microsoft.AspNetCore.Mvc;
using myApp.Data;
using myApp.Helpers;

namespace myApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]  // /api/Users
    public class BaseApiController:ControllerBase
    {
    
    }
}
