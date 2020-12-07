using Freigt_Easy.Core;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class OrderController : ControllerBase
    {
        private Razorpay.Api.RazorpayClient _razorpayClient;
        private readonly IRepository _repository;
        public OrderController(RiaDBContext context, IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/Packages
        [HttpGet]


        public async Task<ActionResult<IEnumerable<Order>>> Get()

        {
            return await _repository.ListAllAsync<Order>();


        }


        //// GET: api/Orders/5
        [HttpGet("{id}", Name = "GetOrder")]
        public  ActionResult<Order> GetOrder(int id)
        {
            var order =  _repository.FindSingle<Order>(x=>x.Id ==id, new string[] { "VesselCharge"});

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> Post(Order order)
        {

            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
                eMail = util.GetEmailclaim(User.Identity as ClaimsIdentity);
            }


            if (order.Id > 0)
            {
                order.UpdatedBy = eMail;
                await _repository.UpdateAsync<Order>(order);
            }
            else
            {
                order.CreatedBy = eMail;
                order.OrderUNId = Guid.NewGuid().ToString();
                
                await _repository.AddAsync<Order>(order);

                if (order.IsCreditAllowed != "true")
                {

                    int totalCharges = (int)Math.Ceiling(order.TotalCharges);

                    var options = new Dictionary<string, object>
                    {
                        { "amount", totalCharges*100 }, // since it is paise mode
                        { "currency", "INR" },
                        { "receipt", order.OrderUNId },
                        { "payment_capture", true }
                    };
                    _razorpayClient = new Razorpay.Api.RazorpayClient("rzp_test_URKYy5ydwVxT87", "S28EZWIL0R9CYgDaduWytQID");
                    var rzOrder = _razorpayClient.Order.Create(options);
                    var orderId = rzOrder["id"].ToString();
                    var orderJson = rzOrder.Attributes.ToString();
                    order.RzOrderId = orderId;
                    order.RzrKey = "rzp_test_URKYy5ydwVxT87";
                    await _repository.UpdateAsync<Order>(order);
                
                   // return Ok(orderJson);
                }
                //email id
                //Phone no
                //Name
                //userID
                //bookingId

            }


            

            return  GetOrder(order.Id);

        }
        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _repository.GetByIdAsync<Order>(id);

            if (order == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Order>(order);

            return order;
        }
    }
}
