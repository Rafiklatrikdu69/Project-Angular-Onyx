using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_image_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class DemoController : ControllerBase
    {
        [HttpGet]
        public String get()
        {
            return "Salut mon docker marche !";
        }
    }
}
