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
        public IActionResult Get()
        {
            var allCharacterSheets = _service.GetAllCharacterSheets();
            return Ok(allCharacterSheets);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var characterSheets = _service.GetAllCharacterSheetsForUser(userId);
            if (characterSheets is null)
            {
                return BadRequest($"There is no character sheets for user with id {userId}");
            }
            return Ok(characterSheets);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var characterSheet = _service.GetCharacterSheetById(id);
            if (characterSheet is null)
            {
                return BadRequest($"There is no character sheet wtih id of {id}");
            }

            return Ok(characterSheet);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] CharacterSheet characterSheet)
        {
            IActionResult result = null;
            if (_service.GetCharacterSheetById(id) is null)
            {
                result = BadRequest($"There is no character sheet with the id of {id}");
            }
            else
            {
                characterSheet.CharacterId = id;
                _service.UpdateCharacter(characterSheet);
                result = Ok();
            }
            return result;
        }


        [HttpPost]
        public IActionResult Post([FromBody] CharacterSheet characterSheet)
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
            if (_service.GetCharacterSheetById(characterId) is null)
            {
                return BadRequest($"There is no character sheet with the id of {characterId}");
            }

            _service.DeleteItem(characterId);
            return Ok();
        }
    }
}
