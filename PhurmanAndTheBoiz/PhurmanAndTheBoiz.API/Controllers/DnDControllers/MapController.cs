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

        [HttpGet]
        public IActionResult Get()
        {
            var allMaps = _service.GetAllDnDMaps();
            return Ok(allMaps);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var maps = _service.GetAllMapsForUser(userId);
            if (maps is null)
            {
                return BadRequest($"There is no maps for user with id {userId}");
            }
            return Ok(maps);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            IActionResult result = null;
            var map = _service.GetMapById(id);
            if (map is null)
            {
                result = BadRequest($"There was no by by the id {id}");
            }
            else
            {
                result = Ok(map);
            }
            return result;
        }

        // POST: api/dnd/CharacterSheet
        [HttpPost]
        public IActionResult Post([FromBody] DnDMap value)
        {
            value.MapId = null;
            _service.SaveMap(value);
            return Ok(value);
        }

        // PUT: api/CharacterSheet/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] DnDMap value)
        {
            IActionResult result = null;
            var map = _service.GetMapById(id);
            if (map is null)
            {
                result = BadRequest($"There was no by by the id {id}");
            }
            else
            {
                _service.UpdateMap(value);
                result = Ok(map);
            }
            return result;
        }

        [HttpDelete("{userId}/{mapId}")]
        public IActionResult Delete(int userId, string mapId)
        {
            IActionResult result = null;
            var map = _service.GetMapById(id);
            if (map is null)
            {
                result = BadRequest($"There was no by by the id {id}");
            }
            else
            {
                _service.DeleteMap(id);
                result = Ok(map);
            }
            return result;
        }
    }
}
