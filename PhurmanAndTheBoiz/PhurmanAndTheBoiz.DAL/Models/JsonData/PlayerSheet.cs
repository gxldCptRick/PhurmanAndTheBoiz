using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public partial class CharacterSheet
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [JsonProperty("characterId", NullValueHandling = NullValueHandling.Ignore)]
        public string CharacterId { get; set; }

        [JsonProperty("userId", NullValueHandling = NullValueHandling.Ignore)]
        public int? UserId { get; set; }

        [JsonProperty("level", NullValueHandling= NullValueHandling.Ignore)]
        public int? Level { get; set; }

        [JsonProperty("characterName", NullValueHandling = NullValueHandling.Ignore)]
        public string CharacterName { get; set; }

        [JsonProperty("class", NullValueHandling = NullValueHandling.Ignore)]
        public string Class { get; set; }

        [JsonProperty("alignment", NullValueHandling = NullValueHandling.Ignore)]
        public string Alignment { get; set; }

        [JsonProperty("experiencePoints", NullValueHandling = NullValueHandling.Ignore)]
        public int? ExperiencePoints { get; set; }

        [JsonProperty("stats", NullValueHandling = NullValueHandling.Ignore)]
        public Stats PlayerStats { get; set; }

        [JsonProperty("inspiration", NullValueHandling = NullValueHandling.Ignore)]
        public int? Inspiration { get; set; }

        [JsonProperty("savingThrows", NullValueHandling = NullValueHandling.Ignore)]
        public Stats SavingThrows { get; set; }

        [JsonProperty("inventory", NullValueHandling = NullValueHandling.Ignore)]
        public List<Item> Inventory { get; set; }

        [JsonProperty("gold", NullValueHandling = NullValueHandling.Ignore)]
        public int? Gold { get; set; }

        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }
    }
}
