using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services;
using PhurmanAndTheBoiz.DAL.Services.Exceptions;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PhurmanAndTheBoiz.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }
        [Route("{action}")]
        public IActionResult Authenticate([FromBody]User userDto)
        {
            var user = _service.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
            {
                return BadRequest("Username or password is incorrect");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("okay fermin lets get super cereal this time around");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var Token = tokenHandler.WriteToken(token);

            return Ok(new
            {
                userDto,
                Token
            });
        }

        [Route("{action}")]
        public IActionResult Register([FromBody]User userDto)
        {
            try
            {
                _service.Create(userDto, userDto.Password);
                return Ok();
            }
            catch (AppException e)
            {
                return BadRequest(e);
            }
        }
        // GET: api/User
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult GetById(int id)
        {
            var user = _service.GetById(id);
            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User userDto)
        {
            try
            {
                var user = _service.GetById(id);
                _service.Update(user, user.Password);
                return Ok();
            }
            catch (AppException appException)
            {
                return BadRequest(appException);
            }
            
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}
