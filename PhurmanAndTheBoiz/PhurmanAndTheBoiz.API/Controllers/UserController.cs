﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services;
using PhurmanAndTheBoiz.DAL.Services.Exceptions;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace PhurmanAndTheBoiz.API.Controllers
{
    [Authorize]
    [Route("api/dnd/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserManager _service;
        public UserController(IUserManager service)
        {
            _service = service;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult Authenticate([FromBody]UserAuthentication userDto)
        {
            var user = _service.AuthenticateUser(userDto.Username, userDto.Password);

            if (user == null)
            {
                return BadRequest("Username or password is incorrect");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("okay fermin lets get super cereal this time around");
            var claims = user.Roles.Select((role) => new Claim(ClaimTypes.Role, role)).ToList();
            claims.Add(new Claim(ClaimTypes.Name, user.Id));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var Token = tokenHandler.WriteToken(token);
            userDto.Password = null;
            return Ok(new
            {
                user,
                token = Token
            });
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult Register([FromBody]User userDto)
        {
            var actionResult = default(IActionResult);
            try
            {
                _service.CreateUser(userDto, userDto.Password);
                userDto.Password = null;
                actionResult = StatusCode(201, userDto);
            }
            catch (AppException e)
            {
                actionResult = BadRequest(e);
            }

            return actionResult;
        }


        [HttpPost]
        [Authorize(Policy = "Admin")]
        [Route("[action]")]
        public IActionResult AddRoleToUser([FromBody]User userDto)
        {
            var actionResult = default(IActionResult);
            try
            {
                foreach (var role in userDto.Roles)
                {
                    if (role != null)
                    {
                        _service.AddUserToRole(userDto.Id, role);
                    }
                }

                userDto.Password = null;
                actionResult = StatusCode(201, userDto);
            }
            catch (AppException e)
            {
                actionResult = BadRequest(e);
            }

            return actionResult;
        }

        // GET: api/User
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            var actionResult = Ok(_service.GetAllUsers());
            return actionResult;
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var user = _service.GetUserById(id);
            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] User userDto)
        {
            var actionResult = default(IActionResult);
            try
            {
                var user = _service.GetUserById(id);
                _service.UpdateUser(user, user.Password);
                user.Password = null;
                actionResult = Ok(user);
            }
            catch (AppException appException)
            {
                actionResult = BadRequest(appException);
            }

            return actionResult;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var actionResult = default(IActionResult);
            if (string.IsNullOrWhiteSpace(id))
            {
                actionResult = StatusCode(204);
            }
            else
            {
                _service.DeleteUser(id);
                actionResult = Ok(new { message = $"{id} was successfully deleted." });
            }

            return actionResult;
        }
    }
}
