using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class VesselCharge : BaseEntity
    {


        public string ChargeDetail { get; set; }


        [ForeignKey("ChargedAt")]
        public int ChargedAtId { get; set; }
        public virtual ChargedAt ChargedAt { get; set; }


        public float ChargeAmount { get; set; }
        public string ChargeType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [ForeignKey("schedule")]
        public int VesselScheduleId { get; set; }
        public virtual VesselSchedule VesselSchedule { get; set; }

        [ForeignKey("partner")]
        public int PartnerId { get; set; }
        public virtual Partner Partner { get; set; }
        [ForeignKey("currency")]
        public int CurrencyId { get; set; }
        public virtual Currency Currency { get; set; }


        [ForeignKey("OriginPortId")]
        public int OriginPortId { get; set; }
        public virtual Port OriginPort { get; set; }



        [ForeignKey("DestinationPortId")]
        public int DestinationPortId { get; set; }
        public virtual Port DestinationPort { get; set; }


        [ForeignKey("package")]
        public int PackageId { get; set; }
        public virtual Package Package { get; set; }



        public QuoteTripCharge Charges { get; set; }



        // public List<StandardCharge> StdCharges { get; set; }
    }
}
