using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface ICharacterSheetService
    {
        IEnumerable<CharacterSheet> GetAllCharacterSheets();
        IEnumerable<CharacterSheet> GetAllCharacterSheetsForUser(int userId);
        CharacterSheet GetCharacterSheetById(string characterSheetId);
        void UpdateCharacter(CharacterSheet updatedCharacter);
        CharacterSheet SaveCharacter(CharacterSheet newCharacter);
        void DeleteCharacter(string characterId);
    }
}
