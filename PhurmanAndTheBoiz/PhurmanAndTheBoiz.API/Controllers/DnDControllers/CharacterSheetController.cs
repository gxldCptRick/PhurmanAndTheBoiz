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
    public class CharacterSheetController : ControllerBase
    {
        private IDnDService _service;
        public CharacterSheetController(IDnDService service)
        {
            _service = service;
        }

        // GET: api/dnd/CharacterSheet
        [HttpGet]
        public IActionResult Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/dnd/CharacterSheet/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return "value";
        }

        // POST: api/dnd/CharacterSheet
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
        }

        // PUT: api/CharacterSheet/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] string value)
        {
        }

        // DELETE: api/dnd/yeeted/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
        }
    }
}
