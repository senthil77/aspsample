using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.POCO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

using Swashbuckle.AspNetCore.Annotations;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    public class UtilityController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IRepository _repository;
        public UtilityController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
        // GET: api/<controller>
 

        [SwaggerOperation("GetChargeAt")]

        [HttpGet("{isActive}", Name = "GetChargeAt")]
        public async Task<ActionResult<IEnumerable<ChargedAt>>> GetChargeAt(bool isActive)
        {
            return await _repository.ListAllAsyncWhere<ChargedAt>(x => x.IsActive == isActive);
        }
 
      
        [HttpGet (Name ="GetAllRoles")]
        public async Task<IEnumerable<UserRole>> Get()
        {
            return await _repository.ListAllAsync<UserRole>();
        }


        [SwaggerOperation("GetFx")]
        [Route("[action]")]
        [HttpGet]

        public async Task<IEnumerable<FxRate>> GetFx(string requestData)
        {

            string param = requestData.ToString().Replace("}", string.Empty).Replace("}", string.Empty).Replace("code", string.Empty).Trim().ToUpper().ToString().
                Replace(@"{", string.Empty).Replace(@"""", string.Empty).Replace(":", string.Empty);

            List<FxRate> rates = new List<FxRate>();

            using (var client = new HttpClient())
            {
                try
                {



                    client.BaseAddress = new Uri(_config["BaseValues:fxURL"]);
                    var response = await client.GetAsync($"/api/v6/convert?q={param}&compact=y&apiKey=" + _config["BaseValues:fxApiKey"]);
                    var stringResult = await response.Content.ReadAsStringAsync();
                    var dictResult = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, string>>>(stringResult);

                    foreach (KeyValuePair<string, Dictionary<string, string>> keyValuePair in dictResult)
                    {
                        float defValue = 1;
                        bool isTrue = float.TryParse(keyValuePair.Value["val"].ToString(), out defValue);
                        var rate = new FxRate()
                        {
                            Key = keyValuePair.Key.ToUpper(),
                            Rate = defValue
                        };

                        rates.Add(rate);
                    }

                }
                catch (HttpRequestException httpRequestException)
                {
                    Console.WriteLine(httpRequestException.StackTrace);
                    // return "Error calling API. Please do manual lookup.";
                }
            }
            return rates;
        }

        [SwaggerOperation("IsEmailIdAvailable")]

        [Route("[action]")]
        [HttpGet]
        public bool IsEmailIdAvailable(string emailId)
        {
            bool isExist = true;

            var result = _repository.FindSingle<Partner>(x => x.Email1 == emailId || x.Email2 == emailId);

            if (result == null)
            {
                var userResult = _repository.FindSingle<User>(x => x.Email == emailId);


                isExist = userResult == null ? false : true;
            }
            else
            {
                isExist = true;


            }

            return isExist;
        }



        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
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