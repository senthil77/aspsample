using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.ApiResp;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Freigt_Easy.Core.POCO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

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
            var userList= await  _repository.ListAllAsyncConditionInclude<User>(x=>x.UserRole.RoleName!="ADMIN", new string[] { "UserRole", "Partner"});

            return userList.WithOutPassword();
        }


        [Route("[action]")]
        [HttpGet]
        public async Task<IEnumerable<User>> GetUserList(string requestData)
        {

            ParamQuery json = JsonConvert.DeserializeObject<ParamQuery>(requestData);

            List<User> returnList = new List<User>();

            UserRole urole = _repository.FindSingle<UserRole>(x => x.RoleName == "ADMIN");

            if (json.RoleName == "ADMIN")
            {
                returnList =  await _repository.ListAllAsyncIncludes<User>(new string[] { "Partner","UserRole"});
            }
            else
            {
                returnList= await _repository.ListAllAsyncConditionInclude<User>(x=>x.UserRoleId!= urole.Id, new string[] { "Partner", "UserRole" });
            }
            //

          returnList.Where(x => x.ValidUpTo == DateTime.MinValue).ToList().ForEach(x => x.ValidUpTo = DateTime.Now);

            return returnList.FindAll(x => x.Partner != null).WithOutPassword();

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

            return user.WithOutPassword();
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

            return user.WithOutPassword();

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
                try
                {
                    using (Utility util = new Utility(_repository, _config))
                    {
                        //await util.SendVerificationLink(user.Email, activationCode, user.FirstName);

                        await util.SendWelcomeEmailAsync(user.Email, user.FirstName, activationCode);
                    }
                }
                catch (Exception ex)
                {
                    return NotFound(new ApiResponse(500, ex.Message));
                }

            }

            var result = await GetUser(user.Id);

            return result;

        }

        [HttpPost, Route("ResetActivateLink")]
        public async Task<ActionResult<User>> ResetActivateLink([FromBody]  int userId)
        {
           var  activationCode = Guid.NewGuid().ToString();
            var user = await _repository.GetByIdAsync<User>(Convert.ToInt32(userId));

            if (user == null)
            {
                return NotFound(new ApiResponse(500, $"User not found"));
            }
            user.ActivationCode = activationCode;
             await _repository.UpdateAsync<User>(user);

            using (Utility util = new Utility(_repository, _config))
            {
                //await util.SendVerificationLink(user.Email, activationCode, user.FirstName);

                await util.SendWelcomeEmailAsync(user.Email, user.FirstName, activationCode);
            }

            return user;
        }
        [HttpPost, Route("Activate")]
        public async Task<ActionResult<User>> Activate([FromBody]  ActivateUser activateUser)
        {
            //update user with role
          //  ActivateUser activateUser = JsonConvert.DeserializeObject<ActivateUser>(requestData);
            var user =  _repository.FindSingle<User>(x=>x.Id== activateUser.userId, new string[] { "Partner"});
            if (user == null)
            {
                return NotFound(new ApiResponse(500, $"User not found"));
            }

            user.ValidUpTo = activateUser.validUpTo;
            user.UserRoleId = activateUser.roleId;
            user.IsActive = activateUser.isActive;
            user.Partner.IsActive = activateUser.isActive;
            user.Partner.ValidUpTo = activateUser.validUpTo;
            user.Partner.IsSusbcribed = activateUser.isSubscribed;
            await _repository.UpdateAsync<User>(user);

            return user;
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