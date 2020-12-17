using Freigt_Easy.Core;
using Freigt_Easy.Core.ApiResp;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Freigt_Easy.Core.POCO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]  
    public class OrderController : ControllerBase
    {
        private Razorpay.Api.RazorpayClient _razorpayClient;
        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        private string rzrKey = string.Empty;
        private string rzrSecret = string.Empty;
        public OrderController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
            rzrKey = _config["BaseValues:rzApiKey"];
            rzrSecret = _config["BaseValues:rzsecret"];
        }
        // GET: api/Packages
        [HttpGet]


        public async Task<ActionResult<IEnumerable<Order>>> Get()

        {
            bool isAdminOrSupport = false;
            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
                 isAdminOrSupport = util.IsAdminOrSupport(User.Identity as ClaimsIdentity);

                
            }
            if (isAdminOrSupport)
                return await _repository.ListAllAsync<Order>();
            else
                return await _repository.ListAllAsync<Order>();


        }


        //// GET: api/Orders/5
        [HttpGet("{id}", Name = "GetOrder")]
        public  ActionResult<Order> GetOrder(int id)
        {
            var order =  _repository.FindSingle<Order>(x=>x.Id ==id, new string[] { "VesselCharge", "VesselCharge.Partner",
            "VesselCharge.DestinationPort",  "VesselCharge.OriginPort", "VesselCharge.Package", "VesselCharge.VesselSchedule", "VesselCharge.ChargedAt"
            });

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

       
        [HttpPost, Route("confirm")]
        public async Task<ActionResult<Order>> ConfirmPayment([FromBody] ConfirmPaymentPayload confirmPayment)
        {

    
            
            var attributes = new Dictionary<string, string>
        {
        
            { "razorpay_order_id", confirmPayment.razorpay_order_id },
                { "razorpay_payment_id", confirmPayment.razorpay_payment_id },
            { "razorpay_signature", confirmPayment.razorpay_signature }
        };
            try
            {
                // Razorpay.Api.Utils.ValidatePaymentSignature(attributes);
              


                var cobinedValues = confirmPayment.cart_order_id + "|" + confirmPayment.razorpay_payment_id;
                string hashHMACHex= cobinedValues.HmacSha256Digest(rzrKey);

               


                //if (hashHMACHex == confirmPayment.razorpay_signature)
                //{

                    _razorpayClient = new Razorpay.Api.RazorpayClient(rzrKey, rzrSecret);

                    /*Later this will be on PRod*/
                    // utils.verifyPaymentSignature(attributes);
                    // OR

                    //var payload =confirmPayment.razorpay_order_id + '|' + confirmPayment.razorpay_payment_id;

                    //Razorpay.Api.Utils.verifyWebhookSignature(payload, confirmPayment.razorpay_signature, rzrKey);



                    var order = _razorpayClient.Order.Fetch(confirmPayment.razorpay_order_id);
                    var payment = _razorpayClient.Payment.Fetch(confirmPayment.razorpay_payment_id);
                    var currentOrder = _repository.FindSingle<Order>(x => x.OrderUNId == confirmPayment.cart_order_id, new string[] { "VesselCharge" });
                    if (payment["status"] == "captured" && order["status"] == "paid")
                    {


                        if (currentOrder != null)
                        {
                            currentOrder.RzPaymentId = confirmPayment.razorpay_payment_id;
                            currentOrder.RzSignature = confirmPayment.razorpay_signature;
                            currentOrder.TransactionStatus = "Sucesss";

                        }
                        //   return Ok("Payment Successful");
                    }
                    else {
                        if (currentOrder != null)
                        {
                            currentOrder.RzPaymentId = null;
                            currentOrder.RzSignature = null;
                            currentOrder.TransactionStatus = "Failed";

                        }
                        await _repository.UpdateAsync<Order>(currentOrder);
                    }



                return GetOrder(currentOrder.Id);
                //}
            }
            catch (Exception ex)
            {
                return NotFound(new ApiResponse(500, ex.Message));
            }
           
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
                    _razorpayClient = new Razorpay.Api.RazorpayClient(rzrKey, rzrSecret);
                    var rzOrder = _razorpayClient.Order.Create(options);
                    var orderId = rzOrder["id"].ToString();
                    var orderJson = rzOrder.Attributes.ToString();
                    order.RzOrderId = orderId;
                    order.RzrKey = rzrKey;
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
