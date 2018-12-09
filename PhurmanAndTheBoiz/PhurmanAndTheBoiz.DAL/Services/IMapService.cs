using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface IMapService
    {
        IEnumerable<DnDMap> GetAllDnDMaps();
        IEnumerable<DnDMap> GetAllMapsForUser(string userId);
        DnDMap GetMapById(string mapId);
        void UpdateMap(DnDMap updatedMap);
        DnDMap SaveMap(DnDMap newMap);
        void DeleteMap(string mapId);

    }
}
