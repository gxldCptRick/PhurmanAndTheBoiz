using PhurmanAndTheBoiz.DAL.Models.JsonData;
using System;
using System.Collections.Generic;
using System.Text;

namespace PhurmanAndTheBoiz.DAL.Services
{
    public interface IItemService
    {
        IEnumerable<Item> GetAllItems();
        IEnumerable<Item> GetAllItemsForUser(int userId);
        Item GetItemById(string itemId);
        void UpdateItem(Item updatedItem);
        Item SaveItem(Item newItem);
        void DeleteItem(string itemId);

    }
}
