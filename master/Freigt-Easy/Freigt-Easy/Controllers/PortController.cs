using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortController : ControllerBase
    {
        private readonly IRepository _repository;
        public PortController(RiaDBContext context, IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/Ports
        [HttpGet]


        public async Task<ActionResult<IEnumerable<Port>>> Get()

        {


            // var result = await _repository.ListAllAsync<StandardCharge>();

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
        [HttpPost]
        public async Task<ActionResult<Port>> Post(Port port)
        {

            if (port.Id > 0)
            {
                await _repository.UpdateAsync<Port>(port);
            }
            else
            {

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