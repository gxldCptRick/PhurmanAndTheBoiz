using System.Collections.Generic;
using PhurmanAndTheBoiz.DAL.Models.JsonData;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations
{
    public class MongoDnDService : IDnDService
    {
        public void DeleteCharacter(int userId, int characterId)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteItem(int itemId)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteMap(int userId, int mapId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<CharacterSheet> GetAllCharacterSheetsForUser(int userId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<DnDMap> GetAllDnDMaps()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Item> GetAllItems(int itemId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<DnDMap> GetAllMapsForUser(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Item GetItemById(int itemId)
        {
            throw new System.NotImplementedException();
        }

        public CharacterSheet SaveCharacter(int userId, CharacterSheet newCharacter)
        {
            throw new System.NotImplementedException();
        }

        public Item SaveItem(Item newItem)
        {
            throw new System.NotImplementedException();
        }

        public DnDMap SaveMap(int userId, DnDMap newMap)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateCharacter(CharacterSheet updatedCharacter)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateItem(Item updatedItem)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateMap(DnDMap updatedMap)
        {
            throw new System.NotImplementedException();
        }
    }
}
