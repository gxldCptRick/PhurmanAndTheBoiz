using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using PhurmanAndTheBoiz.DAL.Services;

namespace PhurmanAndTheBoiz.API.Controllers.DnDControllers
{
    [Authorize]
    [Route("api/DnD/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private IMapService _service;
        public MapController(IDnDService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            var allMaps = _service.GetAllDnDMaps();
            return Ok(allMaps);
        }

        [HttpGet("[action]/{userId}")]
        public IActionResult GetUser(string userId)
        {
            IActionResult result = null;
            var maps = _service.GetAllMapsForUser(userId);
            if (maps is null)
            {
                result = BadRequest($"There is no maps for user with id {userId}");
            }
            else
            {
                result = Ok(maps);
            }

            return result;
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            IActionResult result = null;
            var map = _service.GetMapById(id);
            if (map is null)
            {
                result = BadRequest($"There was no Map by the id {id}");
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
            value = _service.SaveMap(value);
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

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
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
