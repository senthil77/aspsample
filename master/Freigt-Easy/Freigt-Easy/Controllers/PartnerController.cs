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
    public class PartnerController : ControllerBase
    {
        private readonly IRepository _repository;

        private readonly IConfiguration _config;

        public PartnerController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
        // GET: api/Partner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> Get()

        {
            return await _repository.ListAllAsync<Partner>();


        }
        [Route("[action]")]
        [HttpGet]
        public int GetTempPartnerId()
        {
            return _repository.FindSingle<Partner>(x => x.PartnerName == "ADMIN").Id;

            // return result.i
        }




        //// GET: api/Partner/5
        [HttpGet("{id}", Name = "Getpartner")]
        public async Task<ActionResult<Partner>> GetPartner(int id)
        {
            var partner = await _repository.GetByIdAsync<Partner>(id);

            if (partner == null)
            {
                return NotFound();
            }

            return partner;
        }
        // POST: api/Partner
        [HttpPost]
        public async Task<ActionResult<Partner>> Post(Partner partner)
        {

            if (partner.Id > 0)
            {
                await _repository.UpdateAsync<Partner>(partner);

            }
            else
            {

                await _repository.AddAsync<Partner>(partner);
                using (Utility uti = new Utility(_repository,_config))
                {
                    await uti.updateUser(partner.Email1, partner.Id);

                }

            }

            return await GetPartner(partner.Id);

        }
        // PUT: api/Partners/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Partners/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Partner>> DeletePartner(int id)
        {
            var partner = await _repository.GetByIdAsync<Partner>(id);

            if (partner == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Partner>(partner);

            return partner;
        }
    }
}