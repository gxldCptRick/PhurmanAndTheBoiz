using Newtonsoft.Json;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public class MapCommand
    {
        [JsonProperty("methodName", NullValueHandling = NullValueHandling.Ignore)]
        public string MethodName { get; set; }

        [JsonProperty("args", NullValueHandling = NullValueHandling.Ignore)]
        public dynamic Args { get; set; }
    }
}
