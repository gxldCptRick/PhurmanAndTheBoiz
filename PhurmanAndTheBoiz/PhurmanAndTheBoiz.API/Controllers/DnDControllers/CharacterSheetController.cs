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

        [HttpGet]
        public IActionResult GetAllCharacterSheetsForUser(int userId)
        {
            var characterSheets = _service.GetAllCharacterSheetsForUser(userId);
            return Ok(characterSheets);
        }

        //TODO: update charactor
        public IActionResult UpdateCharacter()
        {
            throw new NotImplementedException();
        }


        public IActionResult SaveCharacter([FromBody] CharacterSheet characterSheet)
        {
            _service.SaveCharacter(characterSheet);
            return Ok();
        }

        public IActionResult DeleteCharacter(int userId, string characterId)
        {
            _service.DeleteCharacter(userId, characterId);
            return Ok();
        }



        // GET: api/CharacterSheet
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CharacterSheet/5
        [HttpGet("{id}")]
        public string Get(string id)
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
