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
    public class PackageController : ControllerBase
    {
        private readonly IRepository _repository;
        public PackageController(RiaDBContext context, IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/Packages
        [HttpGet]


        public async Task<ActionResult<IEnumerable<Package>>> Get()

        {
            return await _repository.ListAllAsync<Package>();


        }


        //// GET: api/Packages/5
        [HttpGet("{id}", Name = "GetPackage")]
        public async Task<ActionResult<Package>> GetPackage(int id)
        {
            var package = await _repository.GetByIdAsync<Package>(id);

            if (package == null)
            {
                return NotFound();
            }

            return package;
        }
        // POST: api/Packages
        [HttpPost]
        public async Task<ActionResult<Package>> Post(Package package)
        {

            if (package.Id > 0)
            {
                await _repository.UpdateAsync<Package>(package);
            }
            else
            {

                await _repository.AddAsync<Package>(package);


            }

            return CreatedAtAction("GetPackage", new { id = package.Id }, package);

        }
        // PUT: api/Packages/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Package>> DeletePackage(int id)
        {
            var package = await _repository.GetByIdAsync<Package>(id);

            if (package == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Package>(package);

            return package;
        }
    }
}