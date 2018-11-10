using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.Globalization;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{

    public partial class DnDMap
    {
        [JsonProperty("mapId", NullValueHandling = NullValueHandling.Ignore)]
        public int? MapId { get; set; }

        [JsonProperty("mapName", NullValueHandling = NullValueHandling.Ignore)]
        public string MapName { get; set; }

        [JsonProperty("tags", NullValueHandling = NullValueHandling.Ignore)]
        public List<string> Tags { get; set; }

        [JsonProperty("userId", NullValueHandling = NullValueHandling.Ignore)]
        public int? UserId { get; set; }

        [JsonProperty("createdBy", NullValueHandling = NullValueHandling.Ignore)]
        public string CreatedBy { get; set; }

        [JsonProperty("lines", NullValueHandling = NullValueHandling.Ignore)]
        public List<Line> Lines { get; set; }
    }

    public partial class Line
    {
        [JsonProperty("color", NullValueHandling = NullValueHandling.Ignore)]
        public string Color { get; set; }

        [JsonProperty("points", NullValueHandling = NullValueHandling.Ignore)]
        public List<Point> Points { get; set; }
    }

    public partial class Point
    {
        [JsonProperty("x", NullValueHandling = NullValueHandling.Ignore)]
        public int? X { get; set; }

        [JsonProperty("y", NullValueHandling = NullValueHandling.Ignore)]
        public int? Y { get; set; }
    }
}