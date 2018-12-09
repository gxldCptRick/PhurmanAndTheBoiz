using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using Newtonsoft.Json;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public partial class Item
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [JsonProperty("itemId", NullValueHandling = NullValueHandling.Ignore)]
        public string ItemId { get; set; }

        [JsonProperty("userId", NullValueHandling = NullValueHandling.Ignore)]
        public string UserId { get; set; }

        [JsonProperty("itemType", NullValueHandling = NullValueHandling.Ignore)]
        public string ItemType { get; set; }

        [JsonProperty("itemName", NullValueHandling = NullValueHandling.Ignore)]
        public string ItemName { get; set; }

        [JsonProperty("stats", NullValueHandling = NullValueHandling.Ignore)]
        public ItemStats Stats { get; set; }
    }
}
