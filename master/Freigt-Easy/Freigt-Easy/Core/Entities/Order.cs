using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class Order : BaseEntity
    {
        public string OrderUNId { get; set; }
        public int BlCount { get; set; }
        public string Commodity { get; set; }
        public string CommodityType { get; set; }
        public int Qty { get; set; }

        public float OriginFxValue { get; set; }
        public float DestFxValue { get; set; }
        public DateTime OrderDate { get; set; }
        public float TotalCharges { get; set; }

        public string RzOrderId{get;set;}
        public string RzPaymentId { get; set; }
        public string RzSignature{ get; set; }

        [ForeignKey("VesselChargeOrder")]
        public int VesselChargeId { get; set; }
        public VesselCharge VesselCharge { get; set; }
 
        public string TransactionStatus { get; set; }



        [NotMapped]
        public string IsCreditAllowed { get; set; }

        [NotMapped]
        public string RzrKey { get; set; }


    }
}

