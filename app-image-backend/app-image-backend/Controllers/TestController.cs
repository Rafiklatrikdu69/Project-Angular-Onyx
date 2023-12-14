using Microsoft.AspNetCore.Mvc;
using app_image_backend.Models;

namespace app_image_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ConnexionBD _connexionBD;

        public TestController(ConnexionBD connexionBD)
        {
            _connexionBD = connexionBD;
        }

        [HttpGet]
        public IActionResult TestConnection()
        {
            _connexionBD.TestConnection();

            return Ok("Test de connexion effectué. Vérifiez la sortie de la console pour les résultats.");
        }

       
    }
}
