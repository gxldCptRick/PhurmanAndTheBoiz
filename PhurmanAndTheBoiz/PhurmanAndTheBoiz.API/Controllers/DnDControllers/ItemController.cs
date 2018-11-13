using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhurmanAndTheBoiz.DAL.Models.JsonData;
using PhurmanAndTheBoiz.DAL.Services;

namespace PhurmanAndTheBoiz.API.Controllers.DnDControllers
{
    [Route("api/DnDControllers/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private IDnDService _service;
        public ItemController(IDnDService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAllItems()
        {
            var items = _service.GetAllItems();
            return Ok(items);
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult GetItemById(string id)
        {
            var item = _service.GetItemById(id);
            return Ok(item);
        }

        //TODO: Update Item
        [HttpPost]
        public void UpdateItem(string id, [FromBody] Item item)
        {
        }

        [HttpPost]
        public IActionResult SaveItem([FromBody] Item item)
        {
            _service.SaveItem(item);
            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteItem(string itemId)
        {
            _service.DeleteItem(itemId);
            return Ok();
        }
    }
}
