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
    public class CurrencyController : ControllerBase
    {
        private readonly IRepository _repository;
        public CurrencyController(RiaDBContext context, IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/Currency
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Currency>>> Get()

        {
            return await _repository.ListAllAsync<Currency>();


        }

        //// GET: api/Currency/5
        [HttpGet("{id}", Name = "GetCurrency")]
        public async Task<ActionResult<Currency>> GetCurrency(int id)
        {
            var currency = await _repository.GetByIdAsync<Currency>(id);

            if (currency == null)
            {
                return NotFound();
            }

            return currency;
        }
        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<Currency>> Post(Currency currency)
        {

            if (currency.Id > 0)
            {
                await _repository.UpdateAsync<Currency>(currency);
            }
            else
            {
                await _repository.AddAsync<Currency>(currency);


            }

            return CreatedAtAction("GetCurrency", new
            { id = currency.Id }, currency);

        }
        // PUT: api/Currency/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Currency>> DeleteCurrency(int id)
        {
            var currency = await _repository.GetByIdAsync<Currency>(id);

            if (currency == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Currency>(currency);

            return currency;
        }
    }
}