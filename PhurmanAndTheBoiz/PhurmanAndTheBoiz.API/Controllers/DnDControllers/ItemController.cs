using Microsoft.AspNetCore.Mvc;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using PhurmanAndTheBoiz.DAL.Services;
using System.Collections.Generic;

namespace PhurmanAndTheBoiz.API.Controllers.DnDControllers
{
    [Route("api/dnd/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private IDnDService _service;
        public ItemController(IDnDService service)
        {
            _service = service;
        }

        // GET: api/Item
        [HttpGet]
        public IEnumerable<Item> Get()
        {
            return _service.GetAllItems();
        }

        // GET: api/Item/5
        [HttpGet("{id}")]
        public Item Get(string id)
        {
            return _service.GetItemById(id);
        }

        // POST: api/Item
        [HttpPost]
        public IActionResult Post([FromBody] Item value)
        {
            IActionResult result = null;
            if (value is null)
            {
                result = BadRequest("Item Could not be transformed into an Item");
            }
            else
            {
                _service.SaveItem(value);
                result = Ok(value);
            }
            return result;
        }

        // PUT: api/Item/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }
    }
}
