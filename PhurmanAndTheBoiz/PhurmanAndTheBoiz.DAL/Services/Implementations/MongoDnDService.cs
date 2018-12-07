using MongoDB.Driver;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System.Collections.Generic;
using System.Linq;

namespace PhurmanAndTheBoiz.DAL.Services.Implementations
{
    public class MongoDnDService : IDnDService
    {
        private readonly string _mongoConnectionString;
        private readonly string _database;
        public MongoDnDService(string mongoConnectionString, string database)
        {
            _mongoConnectionString = mongoConnectionString;
            _database = database;
        }

        public IEnumerable<DnDMap> GetAllDnDMaps()
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var maps = database.GetCollection<DnDMap>("Maps");
            var mapsList = maps.Find(_ => true).ToList();
            return mapsList;
        }

        public IEnumerable<Item> GetAllItems()
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var items = database.GetCollection<Item>("Items");
            var itemsList = items.Find(_ => true).ToList();
            return itemsList;
        }

        public IEnumerable<CharacterSheet> GetAllCharacterSheets()
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var items = database.GetCollection<CharacterSheet>("CharacterSheets");
            var itemsList = items.Find(_ => true).ToList();
            return itemsList;
        }

        public IEnumerable<CharacterSheet> GetAllCharacterSheetsForUser(int userId)
        {
            return GetAllCharacterSheets().Where(cs => cs.UserId == userId);
        }

        public IEnumerable<Item> GetAllItemsForUser(int userId)
        {
            return GetAllItems().Where(i => i.UserId == userId);
        }

        public IEnumerable<DnDMap> GetAllMapsForUser(int userId)
        {
            return GetAllDnDMaps().Where(m => m.UserId == userId);
        }

        public CharacterSheet GetCharacterSheetById(string characterSheetId)
        {
            return GetAllCharacterSheets().SingleOrDefault(cs => cs.CharacterId == characterSheetId);
        }


        public Item GetItemById(string itemId)
        {
            return GetAllItems().SingleOrDefault(i => i.ItemId == itemId);
        }

        public DnDMap GetMapById(string mapId)
        {
            return GetAllDnDMaps().SingleOrDefault(m => m.MapId == mapId);
        }

        public CharacterSheet SaveCharacter(CharacterSheet newCharacter)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var characterSheets = database.GetCollection<CharacterSheet>("CharacterSheets");
            characterSheets.InsertOne(newCharacter);
            return characterSheets.Find((e) => e.UserId == newCharacter.UserId &&
            e.Level == newCharacter.Level &&
            e.CharacterName == newCharacter.CharacterName &&
            e.Class == newCharacter.Class && 
            e.Description == newCharacter.Description).Single();
        }

        public Item SaveItem(Item newItem)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var Items = database.GetCollection<Item>("Items");
            Items.InsertOne(newItem);
            return Items.Find((e) => e.ItemType == newItem.ItemType &&
            e.ItemName == newItem.ItemName  &&
            e.UserId == newItem.UserId).Single();
        }

        public DnDMap SaveMap(DnDMap newMap)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var Maps = database.GetCollection<DnDMap>("Maps");
            Maps.InsertOne(newMap);

            return Maps.Find((e) => e.MapName == newMap.MapName &&
            e.Tags == newMap.Tags &&
            e.CreatedBy == newMap.CreatedBy
            && e.UserId == newMap.UserId).Single();
        }

        public void UpdateCharacter(CharacterSheet updatedCharacter)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var characterSheets = database.GetCollection<CharacterSheet>("CharacterSheets");
            characterSheets.ReplaceOne((cs) => cs.CharacterId == updatedCharacter.CharacterId, updatedCharacter);
        }

        public void UpdateItem(Item updatedItem)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var items = database.GetCollection<Item>("Items");
            var item = items.Find(i => i.ItemId == updatedItem.ItemId).First();
            updatedItem.ItemName = updatedItem.ItemName ?? item.ItemName;
            updatedItem.ItemType = updatedItem.ItemType ?? item.ItemType;
            updatedItem.Stats = updatedItem.Stats ?? item.Stats;
            updatedItem.UserId = updatedItem.UserId == 0 ? item.UserId : updatedItem.UserId;
            items.ReplaceOne(i => i.ItemId == updatedItem.ItemId, updatedItem);
        }

        public void UpdateMap(DnDMap updatedMap)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var maps = database.GetCollection<DnDMap>("Maps");
            maps.ReplaceOne(m => m.MapId == updatedMap.MapId, updatedMap);
        }

        public void DeleteCharacter(string characterId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var items = database.GetCollection<CharacterSheet>("CharacterSheets");
            items.DeleteOne(cs => cs.CharacterId == characterId);
        }

        public void DeleteItem(string itemId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var items = database.GetCollection<Item>("Items");
            items.DeleteOne(i => i.ItemId == itemId);
        }

        public void DeleteMap(string mapId)
        {
            var client = new MongoClient(_mongoConnectionString);
            var database = client.GetDatabase(_database);
            var maps = database.GetCollection<DnDMap>("Maps");
            maps.DeleteOne(m => m.MapId == mapId);
        }
    }
}
