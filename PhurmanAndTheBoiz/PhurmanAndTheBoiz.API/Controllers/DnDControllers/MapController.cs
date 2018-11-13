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
    [Route("api/DnD/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private IDnDService _service;
        public MapController(IDnDService service)
        {
            _service = service;
        }
        
        // GET: api/DnDMap/5
        [HttpGet("{id}")]
        public string Get(string id)
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
        public void Put(string id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }
    }
}
