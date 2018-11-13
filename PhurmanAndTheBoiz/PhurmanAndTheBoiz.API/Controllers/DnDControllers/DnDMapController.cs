using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using PhurmanAndTheBoiz.DAL.Services;

namespace PhurmanAndTheBoiz.API.Controllers.DnDControllers
{
    [Route("api/DnDControllers/[controller]")]
    [ApiController]
    public class DnDMapController : ControllerBase
    {
        private IDnDService _service;
        public DnDMapController(IDnDService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAllDnDMaps()
        {
            var maps = _service.GetAllDnDMaps();
            return Ok(maps);
        }

        [HttpGet]
        public IActionResult GetUserMaps(int userId)
        {
            var maps = _service.GetAllMapsForUser(userId);
            return Ok(maps);
        }

        //TODO: Update map
        [HttpPost]
        public IActionResult UpdateMap()
        {
            return BadRequest();
        }


        [HttpPost]
        public IActionResult SaveMap(DnDMap map)
        {
            _service.SaveMap(map);
            return Ok();
        }
        // GET: api/DnDMap
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DnDMap/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DnDMap
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/DnDMap/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
