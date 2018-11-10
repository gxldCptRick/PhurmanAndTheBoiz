using Newtonsoft.Json;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public partial class Line
    {
        [JsonProperty("color", NullValueHandling = NullValueHandling.Ignore)]
        public string Color { get; set; }

        [JsonProperty("points", NullValueHandling = NullValueHandling.Ignore)]
        public List<Point> Points { get; set; }
    }
}
