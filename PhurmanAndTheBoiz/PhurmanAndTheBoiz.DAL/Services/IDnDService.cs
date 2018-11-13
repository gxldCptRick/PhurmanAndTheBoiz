using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface IDnDService
    {
        IEnumerable<Item> GetAllItems();
        IEnumerable<DnDMap> GetAllDnDMaps();
        IEnumerable<CharacterSheet> GetAllCharacterSheets();

        IEnumerable<Item> GetAllItemsForUser(int userId);
        IEnumerable<DnDMap> GetAllMapsForUser(int userId);
        IEnumerable<CharacterSheet> GetAllCharacterSheetsForUser(int userId);

        Item GetItemById(string itemId);
        DnDMap GetMapById(string mapId);
        CharacterSheet GetCharacterSheetById(string characterSheetId);

        void UpdateItem(Item updatedItem);
        void UpdateCharacter(CharacterSheet updatedCharacter);
        void UpdateMap(DnDMap updatedMap);
        void SaveItem(Item newItem);
        void SaveCharacter(CharacterSheet newCharacter);
        void SaveMap(DnDMap newMap);
        void DeleteMap(int userId, string mapId);
        void DeleteCharacter(int userId, string characterId);
        void DeleteItem(string itemId);
    }
}
