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
            var map = _service.GetMapById(id);
            if (map is null)
            {
                return BadRequest($"There is no map wtih id of {id}");
            }

            return Ok(map);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] DnDMap map)
        {
            if (_service.GetMapById(id) is null)
            {
                return BadRequest($"There is no map with the id of {id}");
            }
            map.MapId = id;
            _service.UpdateMap(map);

            return Ok();
        }


        [HttpPost]
        public IActionResult Post([FromBody] DnDMap map)
        {
            IActionResult result = null;
            if (map is null)
            {
                return BadRequest("Character sheet could not be saved to database");
            }
            _service.SaveMap(map);
            return Ok(map);
        }

        [HttpDelete("{userId}/{mapId}")]
        public IActionResult Delete(int userId, string mapId)
        {
            if (_service.GetMapById(mapId) is null)
            {
                return BadRequest($"There is no map with id {mapId}");
            }

            _service.DeleteMap(userId, mapId);
            return Ok();

        }
    }
}
