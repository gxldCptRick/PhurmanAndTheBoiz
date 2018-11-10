using Newtonsoft.Json;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public partial class Point
    {
        [JsonProperty("x", NullValueHandling = NullValueHandling.Ignore)]
        public int? X { get; set; }

        [JsonProperty("y", NullValueHandling = NullValueHandling.Ignore)]
        public int? Y { get; set; }
    }
}
