using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Freigt_Easy.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        public UserController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
        // GET: api/User
        [HttpGet]

        public async Task<ActionResult<IEnumerable<User>>> Get()

        {
            return await _repository.ListAllAsync<User>();


        }

        //// GET: api/User/5
        //[HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _repository.GetByIdAsync<User>(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("Test")]
        public ActionResult<User> VeryfiyUserAccount(string requestData)
        {

            string param = requestData.ToString().Replace("}", string.Empty).Replace("}", string.Empty).Replace("code", string.Empty).Trim().ToUpper().ToString().
               Replace(@"{", string.Empty).Replace(@"""", string.Empty).Replace(":", string.Empty);

            var user = _repository.FindSingleAsync<User>(x => x.ActivationCode == param.ToLower().ToString()).Result;

            if (user == null)
            {
                return NotFound();
            }

            return user;

        }

        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
        {
            string activationCode = string.Empty;
            if (user.Id > 0)
            {
                await _repository.UpdateAsync<User>(user);
            }
            else
            {

                activationCode = Guid.NewGuid().ToString();



                user.ActivationCode = activationCode;


                await _repository.AddAsync<User>(user);
                using (Utility util = new Utility( _repository, _config))
                {
                    //await util.SendVerificationLink(user.Email, activationCode, user.FirstName);

                    await util.SendWelcomeEmailAsync(user.Email, user.FirstName, activationCode);
                }

            }

            var result = await GetUser(user.Id);

            return result;

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _repository.GetByIdAsync<User>(id);

            if (user == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<User>(user);

            return user;
        }
    }
}