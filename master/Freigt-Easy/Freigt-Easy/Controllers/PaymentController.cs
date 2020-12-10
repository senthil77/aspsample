using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private RazorpayClient _razorpayClient;
        public PaymentController()
        {
           
        }

        [HttpPost]
        [Route("initialize")]
        public async Task<IActionResult> InitializePayment()
        {
            var options = new Dictionary<string, object>
        {
            { "amount", 200 },
            { "currency", "INR" },
            { "receipt", "recipt_1" },
            // auto capture payments rather than manual capture
            // razor pay recommended option
            { "payment_capture", true }
        };
            _razorpayClient = new RazorpayClient("rzp_test_URKYy5ydwVxT87", "S28EZWIL0R9CYgDaduWytQID");
           var order = _razorpayClient.Order.Create(options);
            var orderId = order["id"].ToString();
            var orderJson = order.Attributes.ToString();
            return Ok(orderJson);
        }

        public class ConfirmPaymentPayload
        {
            public string razorpay_payment_id { get; }
            public string razorpay_order_id { get; }
            public string razorpay_signature { get; }
        }

        [HttpPost]
 
        public async Task<IActionResult> ConfirmPayment([FromBody]ConfirmPaymentPayload confirmPayment)
        {
            var attributes = new Dictionary<string, string> 
        {
            { "razorpay_payment_id", confirmPayment.razorpay_payment_id },
            { "razorpay_order_id", confirmPayment.razorpay_order_id },
            { "razorpay_signature", confirmPayment.razorpay_signature }
        };
            try
            {
                Razorpay.Api.Utils.ValidatePaymentSignature(attributes);




               // utils.verifyPaymentSignature(attributes);
                // OR
                var isValid = Utils.ValidatePaymentSignature(attributes);
                if (isValid)
                {
                    var order = _razorpayClient.Order.Fetch(confirmPayment.razorpay_order_id);
                    var payment = _razorpayClient.Payment.Fetch(confirmPayment.razorpay_payment_id);
                    if (payment["status"] == "captured")
                    {
                        return Ok("Payment Successful");
                    }
                }
            }
            catch (Exception ex)
            {
                var s = ex;
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
    
} 