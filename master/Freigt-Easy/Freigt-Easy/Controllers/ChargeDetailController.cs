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

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChargeDetailController : ControllerBase
    {
        private readonly IRepository _repository;
        public ChargeDetailController(RiaDBContext context, IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/ChargeDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChargeDetail>>> Get()
        {



            var result = _repository.ListAllAsyncConditionInclude<ChargeDetail>(x => x.IsActive == true, new string[] { "ChargedAt" });
            return await result;


        }

        //// GET: api/ChargeDetail/5
        //[HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<ChargeDetail>> GetChargeDetail(int id)
        {
            var chargeDetail = await _repository.GetByIdAsync<ChargeDetail>(x => x.Id == id, new string[] { "ChargedAt" });


            if (chargeDetail == null)
            {
                return NotFound();
            }

            return chargeDetail;
        }
        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<ChargeDetail>> Post(ChargeDetail chargeDetail)
        {
            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
                eMail = util.GetEmailclaim(User.Identity as ClaimsIdentity);
            }
            if (chargeDetail.Id > 0)
            {
                chargeDetail.UpdatedBy = eMail;
                 await _repository.UpdateAsync<ChargeDetail>(chargeDetail);
            }
            else
            {
                chargeDetail.CreatedBy = eMail;
                await _repository.AddAsync<ChargeDetail>(chargeDetail);


            }

            return await GetChargeDetail(chargeDetail.Id);

        }
        // PUT: api/ChargeDetail/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ChargeDetail/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChargeDetail>> DeleteChargeDetail(int id)
        {
            var chargeDetail = await _repository.GetByIdAsync<ChargeDetail>(id);

            if (chargeDetail == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<ChargeDetail>(chargeDetail);

            return chargeDetail;
        }


    }

}