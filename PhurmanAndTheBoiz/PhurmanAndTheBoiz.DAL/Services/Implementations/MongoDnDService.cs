using MongoDB.Driver;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations
{
    public class MongoDnDService : IDnDService
    {
        private readonly string _mongoConnectionString;
        public MongoDnDService(string mongoConnectionString)
        {
            _mongoConnectionString = mongoConnectionString;
        }

        public void DeleteCharacter(int userId, int characterId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var items = database.GetCollection<CharacterSheet>("CharacterSheets");
            items.DeleteOne(cs => cs.CharacterId == characterId && cs.UserId == userId);
        }

        public void DeleteItem(int itemId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var items = database.GetCollection<Item>("Items");
            items.DeleteOne(i =>  i.ItemId == itemId);
        }

        public void DeleteMap(int userId, int mapId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var maps = database.GetCollection<DnDMap>("Maps");
            maps.DeleteOne(m => m.MapId == mapId && m.UserId == userId);
        }

        public IEnumerable<CharacterSheet> GetAllCharacterSheetsForUser(int userId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var characterSheets = database.GetCollection<CharacterSheet>("CharacterSheets");
            var characterSheetList = characterSheets.Find((s) => s.UserId == userId).ToList();
            return characterSheetList;
        }

        public IEnumerable<DnDMap> GetAllDnDMaps()
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var maps = database.GetCollection<DnDMap>("Maps");
            var mapsList = maps.Find(_ => true).ToList();
            return mapsList;
        }

        public IEnumerable<Item> GetAllItems()
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var items = database.GetCollection<Item>("Items");
            var itemsList = items.Find(_=> true).ToList();
            return itemsList;
        }

        public IEnumerable<DnDMap> GetAllMapsForUser(int userId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var allMaps = database.GetCollection<DnDMap>("Maps");
            var mapsForUser = allMaps.Find(m => m.UserId == userId).ToList();
            return mapsForUser;
        }

        public Item GetItemById(int itemId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase("DnD");
            var allItems = database.GetCollection<Item>("Maps");
            var itemForId = allItems.Find(i => i.ItemId == itemId).SingleOrDefault();
            return itemForId;
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
