using Newtonsoft.Json;

namespace PhurmanAndTheBoiz.DAL.Models.JsonData
{
    public partial class Stats
    {
        [JsonProperty("strength", NullValueHandling = NullValueHandling.Ignore)]
        public long? Strength { get; set; }

        [JsonProperty("dexterity", NullValueHandling = NullValueHandling.Ignore)]
        public long? Dexterity { get; set; }

        [JsonProperty("constitution", NullValueHandling = NullValueHandling.Ignore)]
        public long? Constitution { get; set; }

        [JsonProperty("intelligence", NullValueHandling = NullValueHandling.Ignore)]
        public long? Intelligence { get; set; }

        [JsonProperty("wisdom", NullValueHandling = NullValueHandling.Ignore)]
        public long? Wisdom { get; set; }

        [JsonProperty("charisma", NullValueHandling = NullValueHandling.Ignore)]
        public long? Charisma { get; set; }

        public Stats(int defaultStatSpawn=0)
        {
            Strength = defaultStatSpawn;
            Dexterity = defaultStatSpawn;
            Constitution = defaultStatSpawn;
            Intelligence = defaultStatSpawn;
            Wisdom = defaultStatSpawn;
            Charisma = defaultStatSpawn;
        }
    }
}
