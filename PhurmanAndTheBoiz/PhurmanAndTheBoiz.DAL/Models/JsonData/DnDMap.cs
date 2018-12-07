using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public partial class DnDMap
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [JsonProperty("mapId", NullValueHandling = NullValueHandling.Ignore)]
        public string MapId { get; set; }

        [JsonProperty("mapName", NullValueHandling = NullValueHandling.Ignore)]
        public string MapName { get; set; }

        [JsonProperty("tags", NullValueHandling = NullValueHandling.Ignore)]
        public List<string> Tags { get; set; }

        [JsonProperty("userId", NullValueHandling = NullValueHandling.Ignore)]
        public string UserId { get; set; }

        [JsonProperty("createdBy", NullValueHandling = NullValueHandling.Ignore)]
        public string CreatedBy { get; set; }

        [JsonProperty("lines", NullValueHandling = NullValueHandling.Ignore)]
        public List<Line> Lines { get; set; }
    }
}