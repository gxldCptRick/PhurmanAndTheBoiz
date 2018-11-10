using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface IDnDService
    {
        IEnumerable<DnDMap> GetAllDnDMaps();
        IEnumerable<CharacterSheet> GetAllCharacterSheetsForUser(int userId);
        IEnumerable<DnDMap> GetAllMapsForUser(int userId);
        IEnumerable<Item> GetAllItems();
        Item GetItemById(string itemId);
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
