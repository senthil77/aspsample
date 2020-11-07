using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
     
        public class ScheduleDetail : BaseEntity
        {



            public string TransitTerminal { get; set; }
            public DateTime ExpArrival { get; set; }
            public DateTime ExpDeparture { get; set; }
            public bool IsLoadingAvailable { get; set; }
            public bool IsDeliveryAvailable { get; set; }
            public string TransitRouteNo { get; set; }

            [ForeignKey("VesselSchedule")]
            public int ScheduleId { get; set; }
            public virtual VesselSchedule VesselSchedule { get; set; }


            [ForeignKey("TransitPort")]
            public int TransitPortId { get; set; }
            public virtual Port TransitPort { get; set; }

        
    }
}
