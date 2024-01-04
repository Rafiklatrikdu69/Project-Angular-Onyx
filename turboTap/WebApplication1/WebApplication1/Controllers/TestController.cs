using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
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
