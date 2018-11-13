using Microsoft.AspNetCore.Mvc;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using PhurmanAndTheBoiz.DAL.Services;

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
        public IActionResult Get()
        {
            IActionResult result = null;
            result = Ok(_service.GetAllItems());
            return result;
        }

        [HttpGet("user/{userId}")]
        public IActionResult Get(int userId)
        {
            IActionResult result = null;
            var items = _service.GetAllItemsForUser(userId);
            if (items is null)
            {
                result = BadRequest($"There is no items for user with id {userId}");
            }
            else
            {
                result = Ok(items);
            }

            return result;
        }
        // GET: api/Item/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            IActionResult result = null;
            var item = _service.GetItemById(id);
            if (item is null)
            {
                result = BadRequest($"There was no item with the id of {id}");
            }
            else
            {
                result = Ok(item);
            }
            return result;
        }

        // POST: api/Item
        [HttpPost]
        public IActionResult Post([FromBody] Item value)
        {
            IActionResult result = null;
            if (value is null)
            {
                result = BadRequest("Item Could not be saved into the database.");
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
        public IActionResult Put(string id, [FromBody] Item value)
        {
            IActionResult result = null;
            if (_service.GetItemById(id) is null)
            {
                result = BadRequest($"There is no item with the id of {id}");
            }
            else
            {
                value.ItemId = id;
                _service.UpdateItem(value);
                result = Ok();
            }
            return result;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            IActionResult result = null;
            if (_service.GetItemById(id) is null)
            {
                result = BadRequest($"There is no item with the id of {id}");
            }
            else
            {
                _service.DeleteItem(id);
                result = Ok();
            }
            return result;
        }
    }
}
