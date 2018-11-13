using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhurmanAndTheBoiz.API.Controllers.DnDControllers
{
    [Route("api/DnDControllers/[controller]")]
    [ApiController]
    public class CharacterSheetController : ControllerBase
    {
        // GET: api/CharacterSheet
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CharacterSheet/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CharacterSheet
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/CharacterSheet/5
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
