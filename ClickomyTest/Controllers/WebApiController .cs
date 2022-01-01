using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickomyTest.Controllers
{
    [ApiController]
    
    public class WebApiController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public WebApiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [Route("api/[controller]/[Action]/{title?}")]
        [HttpGet]
        public ActionResult< Parameters> GetParameters([FromQuery]string title)
        {
            try
            {

                //Game+Of+Thrones
                string getData = HendlerController.FetchApiServer($"{_configuration["urlMovieApi"]}/?t={title}&apikey=7506ad3");
                Parameters myData = JsonConvert.DeserializeObject< Parameters>(getData);

                return Ok( myData);
            }
            catch(Exception m)
            {
                return StatusCode(500, m.Message);
            }

        }
        [Route("api/[controller]/[Action]/{title?}/{season?}")]
        [HttpGet]
        public ActionResult GetSeason([FromQuery] string title, [FromQuery] string season)
        {
            try
            {

                //Game+Of+Thrones
                string getData = HendlerController.FetchApiServer($"{_configuration["urlMovieApi"]}/?t={title}&apikey=7506ad3&Season={season}");
               
                return Ok(getData);
            }
            catch (Exception m)
            {
                return StatusCode(500, m.Message);
            }

        }
    }

}
