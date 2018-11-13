using Microsoft.AspNetCore.Mvc;
using PhurmanAndTheBoiz.DAL.Services;

namespace PhurmanAndTheBoiz.API.Controllers.DnDControllers
{
    [Route("api/DnD/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IDnDService _service;
        public MapController(IDnDService service)
        {
            _service = service;
        }

        // GET: api/dnd/CharacterSheet
        [HttpGet]
        public IActionResult Get()
        {
            IActionResult result = null;
            result = Ok(_service.GetAllDnDMaps());
            return result;
        }

        // GET: api/dnd/CharacterSheet/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            IActionResult result = null;
            if (_service.)
            { }
            return result;
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
