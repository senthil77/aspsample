using Freigt_Easy.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace Freigt_Easy.Core.Entities
{
    public class QuoteTripCharge : BaseEntity
    {
        [ForeignKey("OriginCharge")]
        public int OriginCurrencyId { get; set; }
        public virtual Currency OriginCurrency { get; set; }


        [ForeignKey("DestinationCharge")]
        public int DestinationCurrencyId { get; set; }
        public virtual Currency DestinationCurrency { get; set; }



        public List<QuoteTripChargeDetail> ChargeDetails { get; set; }



        public float OriginCharges { get; set; }
        public float DestinationCharges { get; set; }

        [ForeignKey("VesselChargeFright")]
        public int VesselChargeId { get; set; }
        public virtual VesselCharge VesselCharge { get; set; }

    }
}
