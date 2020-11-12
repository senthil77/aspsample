using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.ApiResp;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Freigt_Easy.Core.POCO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {


        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        public AuthenticateController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
    
      

        // GET: api/Login
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody]LoginUser login)
        {
          
            IActionResult response = BadRequest("user does not Exist");
            var user = _repository.GetByIdAsync<User>((x => x.Email == login.UserName && x.ValidUpTo > DateTime.Now ), new string[] { "UserRole" ,"Partner"}).Result;





            if (user != null)
            {

                if (user.Password != login.Password)
                {
                    return NotFound(new ApiResponse(404, $"Password is wrong"));
                }
                else
                {
                    if (user.IsActive)
                    {
                        int iTimeOut = 15;
                        bool b = int.TryParse(_config["Jwt:TimeOut"], out iTimeOut);


                        var tokenString = new Utility(_repository, _config).GenerateJWT(user);

                        user.Password = null;
                        response = Ok(new
                        {
                           
                            token = tokenString,
                            user = user,
                            //expires = DateTime.Now.AddMinutes(iTimeOut),
                        });;
                    }

                    else
                    {
                        return NotFound(new ApiResponse(404, $"user is not Active Call customer support"));
                    }
                }
            }

                

            else
            {

                return NotFound(new ApiResponse(404, $"user not found with id {login.UserName}"));
            }
            return response;



        }

   

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}