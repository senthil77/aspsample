using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class QuoteTripChargeDetail : BaseEntity
    {

        [ForeignKey("ChargeDetails")]
        public int ChargeDetailId { get; set; }
        public virtual ChargeDetail ChargeDetail { get; set; }

        public float ChargeAmount { get; set; }



        [ForeignKey("QuoteTripCharges")]
        public int QuoteTripChargeId { get; set; }
        public virtual QuoteTripCharge QuoteTripCharge { get; set; }



    }

}
