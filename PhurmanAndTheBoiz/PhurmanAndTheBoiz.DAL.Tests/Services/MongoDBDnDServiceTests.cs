using Microsoft.VisualStudio.TestTools.UnitTesting;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using PhurmanAndTheBoiz.DAL.Services;
using PhurmanAndTheBoiz.DAL.Services.Implementations;
using System.Collections.Generic;
using System.Linq;

namespace PhurmanAndTheBoiz.DAL.Tests.Services
{
    [TestClass]
    public class MongoDBDnDServiceTests
    {
        [TestMethod]
        public void CreatingMapUpdatesDatabase()
        {
            var service = CreateDnDService();
            var map = GenerateMap();
            map.UserId = "1";
            service.SaveMap(map);
            var after = service.GetAllMapsForUser("1").Any();
            Assert.IsTrue(!after);
        }

        [TestMethod]
        public void DeletingMapUpdateTheDatabase()
        {
            //arrange
            var service = CreateDnDService();
            var addedmap = GenerateMap();
            addedmap.UserId = "2";

            //act
            service.SaveMap(addedmap);
            var map = service.GetAllMapsForUser("2").FirstOrDefault();
            service.DeleteMap(map?.MapId);
            var deletedMap = service.GetAllMapsForUser("2").FirstOrDefault();

            //assert
            Assert.IsNull(deletedMap);
        }

        [TestMethod]
        public void UpdatingMapUpdatesInTheDatabase()
        {
            var service = CreateDnDService();
            if (service.GetAllMapsForUser("3").Any())
            {
                var mapObj = GenerateMap();
                mapObj.UserId = "3";
                service.SaveMap(mapObj);
            }
            var map = service.GetAllMapsForUser("3").FirstOrDefault();
            var initialName = "Hello";
            var afterName = "Milo";
            map.MapName = initialName;
            service.UpdateMap(map);

            var updatedMap = service.GetAllMapsForUser("3").FirstOrDefault();
            Assert.AreEqual(initialName, updatedMap.MapName);

            //clean-up
            map.MapName = afterName;
            service.UpdateMap(map);
        }

        [TestMethod]
        public void ReadingMapReturnsANonNullRecord()
        {
            var service = CreateDnDService();
            if (service.GetAllMapsForUser("4").Any())
            {
                var map = GenerateMap();
                map.UserId = "4";
                service.SaveMap(map);
            }

            var mapInDB = service.GetAllMapsForUser("4").Single();

            Assert.IsNotNull(mapInDB);
        }

        [TestMethod]
        public void CreatingCharacterSheetUpdatesDatabase()
        {
            var service = CreateDnDService();
            var characterSheet = GenerateCharacter();
            characterSheet.UserId = "1";
            service.SaveCharacter(characterSheet);
            var characterRetrieved = service.GetAllCharacterSheetsForUser("1").FirstOrDefault();
            Assert.IsNotNull(characterRetrieved);
        }

        [TestMethod]
        public void DeletingCharacterSheetUpdatesDatabase()
        {
            //arrange
            var service = CreateDnDService();
            var characterToAdd = GenerateCharacter();
            characterToAdd.UserId = "2";

            //act
            service.SaveCharacter(characterToAdd);
            var characterRetrieved = service.GetAllCharacterSheetsForUser("2").FirstOrDefault();
            service.DeleteCharacter(characterRetrieved.CharacterId);
            var deletedCharacter = service.GetAllCharacterSheetsForUser("2").FirstOrDefault();

            //assert
            Assert.IsNull(deletedCharacter);
        }

        [TestMethod]
        public void ReadingCharcterReturnsANonNullRecord()
        {
            var service = CreateDnDService();
            if (service.GetAllCharacterSheetsForUser("4").Any())
            {
                var map = GenerateCharacter();
                map.UserId = "4";
                service.SaveCharacter(map);
            }

            var mapInDB = service.GetAllCharacterSheetsForUser("4").First();

            Assert.IsNotNull(mapInDB);
        }

        [TestMethod]
        public void UpdatingCharacterUpdatesInDatabase()
        {
            var service = CreateDnDService();
            if (service.GetAllCharacterSheetsForUser("3").Any())
            {
                var characterObj = GenerateCharacter();
                characterObj.UserId = "3";
                service.SaveCharacter(characterObj);
            }
            var character = service.GetAllCharacterSheetsForUser("3").FirstOrDefault();
            var initialName = "Hello";
            var afterName = "Milo";
            character.CharacterName = initialName;
            service.UpdateCharacter(character);

            var updatedMap = service.GetAllCharacterSheetsForUser("3").FirstOrDefault();
            Assert.AreEqual(initialName, updatedMap.CharacterName);

            //clean-up
            character.CharacterName = afterName;
            service.UpdateCharacter(character);
        }

        [TestMethod]
        public void CreatingItemUpdatesDatabase()
        {
            var service = CreateDnDService();
            var item = GenerateItem();
            item.UserId = "1";
            service.SaveItem(item);
            var itemRetrieved = service.GetAllItems().FirstOrDefault(i => i.UserId == "1");
            Assert.IsNotNull(itemRetrieved);
        }

        [TestMethod]
        public void DeletingItemUpdatesDatabase()
        {
            //arrange
            var service = CreateDnDService();
            var itemToAdd = GenerateItem();
            itemToAdd.UserId = "2";

            //act
            service.SaveItem(itemToAdd);
            var item = service.GetAllItems().FirstOrDefault(i => i.UserId == "2");
            service.DeleteItem(item.ItemId);
            var deletedItem = service.GetAllItems().FirstOrDefault(i => i.UserId == "2");

            //assert
            Assert.IsNull(deletedItem);
        }

        [TestMethod]
        public void ReadingItemReturnsANonNullRecord()
        {
            var service = CreateDnDService();
            if (service.GetAllItems().Any(i => i.UserId == "4"))
            {
                var map = GenerateItem();
                map.UserId = "4";
                service.SaveItem(map);
            }

            var mapInDB = service.GetAllItems().First(i => i.UserId == "4");

            Assert.IsNotNull(mapInDB);
        }

        [TestMethod]
        public void UpdatingItemUpdatesInDatabase()
        {
            var service = CreateDnDService();
            if (service.GetAllItems().Any(i => i.UserId == "3"))
            {
                var item = GenerateItem();
                item.UserId = "3";
                service.SaveItem(item);
            }
            var itemUpdates = service.GetAllItems().FirstOrDefault(i => i.UserId == "3");
            var initialName = "Sword Of A Thousand Truths";
            var afterName = "Iron Sword";
            itemUpdates.ItemName = initialName;
            service.UpdateItem(itemUpdates);

            var updatedMap = service.GetAllItems().FirstOrDefault(i => i.UserId == "3");
            Assert.AreEqual(initialName, updatedMap.ItemName);

            //clean-up
            itemUpdates.ItemName = afterName;
            service.UpdateItem(itemUpdates);
        }

        #region Helper Methods
        private IDnDService CreateDnDService()
        {
            return new MongoDnDService(mongoConnectionString: "mongodb://73.20.98.246:27017", database: "dnd_test");
        }

        private DnDMap GenerateMap()
        {
            return new DnDMap
            {
                MapName = "Dali Schllama",
                CreatedBy = "The Batman",
                UserId = null,
                Lines = new List<Line>
                {
                    new Line{
                        Color = "Black",
                        Points = new List<Point>{
                            new Point {
                                X = 0,
                                Y = 0
                            },
                            new Point {
                                X = 1,
                                Y = 1
                            },
                            new Point {
                                X = 2,
                                Y = 2
                            }
                        }
                    }
                },
                Tags = new List<string>
                {
                    "Cold",
                    "Frosty",
                    "Study"
                }
            };
        }

        private CharacterSheet GenerateCharacter()
        {
            return new CharacterSheet
            {
                CharacterName = "The Cooler Man",
                UserId = "",
                Alignment = "Chaotic Neutral",
                Class = "Dragon Slayer",
                Description = "Get some better stuff on things.",
                ExperiencePoints = 100,
                Gold = 120,
                Inspiration = 0,
                Inventory = new List<Item>
                {
                },
                PlayerStats = new Stats(20),
                SavingThrows = new Stats(5)
            };
        }

        private Item GenerateItem()
        {
            return new Item
            {
                UserId = null,
                ItemName = "The Iron Sword",
                ItemType = "Equip",
                Stats = new ItemStats
                {
                    DamageRoll = "2d6",
                    AttackBonus = 5
                }
            };
        }
        #endregion

    }
}
