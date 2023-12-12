using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<User>>> getUsers()
        {
            return new List<User>
            {
                new User
                {
                    ID = 12,
                    Name = "Rafik",
                    Email = "raffraff721@gmail.com"

                },

                new User
                {
                    ID = 13,
                    Name = "Ramazan",
                    Email = "ramazan12@gmail.com"


                }
            };
        }
    }
}
