using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        
        public PortController(RiaDBContext context, IRepository repository, IConfiguration config)
        { 
            _repository = repository;
            _config = config;




        }



        // GET: api/Ports
        [HttpGet]


        public async Task<ActionResult<IEnumerable<Port>>> Get()

        {
             

            return await _repository.ListAllAsync<Port>();


        }


        //// GET: api/Ports/5
        [HttpGet("{id}", Name = "GetPort")]
        public async Task<ActionResult<Port>> GetPort(int id)
        {
            var port = await _repository.GetByIdAsync<Port>(id);

            if (port == null)
            {
                return NotFound();
            }

            return port;
        }
        // POST: api/Ports
        [Authorize(Policy = Policies.Support)]
        [HttpPost]
        public async Task<ActionResult<Port>> Post(Port port)
        {
       
            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
              eMail=  util.GetEmailclaim(User.Identity as ClaimsIdentity);
                
            }

             if (port.Id > 0)
            {
                port.UpdatedBy = eMail;
                await _repository.UpdateAsync<Port>(port);
            }
            else
            {
                port.CreatedBy = eMail;
                await _repository.AddAsync<Port>(port);


            }

            return CreatedAtAction("GetPort", new { id = port.Id }, port);

        }
        // PUT: api/Ports/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Ports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Port>> DeletePort(int id)
        {
            var port = await _repository.GetByIdAsync<Port>(id);

            if (port == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Port>(port);

            return port;
        }
    }
}