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

        [HttpGet("{userId}")]
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


        [HttpPost]
        public IActionResult CreateCharacterSheet([FromBody] CharacterSheet characterSheet)
        {
            IActionResult result = null;
            if (characterSheet is null)
            {
                result = BadRequest("Character sheet could not be saved to database");
            }
            else
            {
                _service.SaveCharacter(characterSheet);
                result = Ok(characterSheet);
            }

            return result;
        }

        [HttpDelete("{userId}/{characterId}")]
        public IActionResult Delete(int userId, string characterId)
        {
            IActionResult result = null;
            var charcterSheets = _service.GetAllCharacterSheetsForUser(userId);
            foreach (var characterSheet in charcterSheets)
            {
                if (characterSheet.CharacterId == characterId)
                {
                    _service.DeleteCharacter(userId, characterId);
                    return Ok();
                }
            }
            return BadRequest($"There is no character sheet with characterId {characterId}");
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
