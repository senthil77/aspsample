using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class QuoteTripChargeController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        public QuoteTripChargeController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
        // GET: api/QuoteTripCharge
        [HttpGet]

        public async Task<ActionResult<IEnumerable<QuoteTripCharge>>> Get()

        {
            return await _repository.ListAllAsync<QuoteTripCharge>();


        }

        [HttpGet("Test")]

        public async Task<ActionResult<QuoteTripCharge>> Get(string requestData)
        {


            QuoteTripCharge quoteTripCharge = new QuoteTripCharge();
            try

            {
                // Do the concilallation
                int vesselChargeId = 0;

                using (Utility util = new Utility(_repository, _config))
                {

                    bool isTrue = int.TryParse(util.StripParam(requestData), out vesselChargeId);

                }


                //first get 

                var chargeCount = _repository.ListAllAsyncWhere<ChargeDetail>(x => x.IsActive == true).Result.Count;

                var qcDummy = await new Utility(_repository,_config).BuildQuoteTrip(vesselChargeId);
                var existingValue = _repository.GetByIdAsync<QuoteTripCharge>(x => x.VesselChargeId == vesselChargeId, new string[] { "ChargeDetails", "ChargeDetails.ChargeDetail" }).Result;

                if (existingValue != null)
                {
                    //fill the missing ones&& 
                    if (existingValue.ChargeDetails.Count < chargeCount)
                    {
                        var existingValues = String.Join(",", existingValue.ChargeDetails.Select(f => f.ChargeDetail.Id).ToList<int>());
                        var diff = qcDummy.ChargeDetails.FindAll(x => !existingValues.Contains(x.ChargeDetail.Id.ToString()));
                        if (diff.Count > 0)
                        {
                            existingValue.ChargeDetails.AddRange(diff);
                        }
                    }



                    quoteTripCharge = existingValue;

                }


                else
                {

                    quoteTripCharge = qcDummy;
                }




            }
            catch (Exception e)
            { throw e; }





            quoteTripCharge.ChargeDetails.OrderBy(x => x.ChargeDetail.ChargedAtId).ThenBy(y=>y.IsActive);
            return quoteTripCharge;
        }

        //// GET: api/QuoteTripCharge/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<QuoteTripCharge>> GetQuoteTripCharge(int id)
        {
            var quoteTripCharge = await _repository.GetByIdAsync<QuoteTripCharge>(id);

            if (quoteTripCharge == null)
            {
                return NotFound();
            }

            return quoteTripCharge;
        }
        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<QuoteTripCharge>> Post(QuoteTripCharge quoteTripCharge)
        {
            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
                eMail = util.GetEmailclaim(User.Identity as ClaimsIdentity);

            }


            if (quoteTripCharge.Id > 0)
            {

                quoteTripCharge.UpdatedBy = eMail;
                quoteTripCharge.ChargeDetails.ForEach(x => x.UpdatedBy = eMail);

                await _repository.UpdateAsync<QuoteTripCharge>(quoteTripCharge);
            }
            else
            {
                quoteTripCharge.CreatedBy = eMail;
                quoteTripCharge.ChargeDetails.ForEach(x => x.CreatedBy = eMail);

                await _repository.AddAsync<QuoteTripCharge>(quoteTripCharge);


            }

            return CreatedAtAction("GetQuoteTripCharge", new
            { id = quoteTripCharge.Id }, quoteTripCharge);

        }
        // PUT: api/QuoteTripCharge/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuoteTripCharge>> DeleteQuoteTripCharge(int id)
        {
            var quoteTripCharge = await _repository.GetByIdAsync<QuoteTripCharge>(id);

            if (quoteTripCharge == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<QuoteTripCharge>(quoteTripCharge);

            return quoteTripCharge;
        }
    }
}