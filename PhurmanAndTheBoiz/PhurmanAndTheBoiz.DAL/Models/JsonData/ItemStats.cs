using Newtonsoft.Json;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public class ItemStats
    {
        [JsonProperty("damageRoll", NullValueHandling = NullValueHandling.Ignore)]
        public string DamageRoll { get; set; }

        [JsonProperty("attackBonus", NullValueHandling = NullValueHandling.Ignore)]
        public long? AttackBonus { get; set; }
    }
}
