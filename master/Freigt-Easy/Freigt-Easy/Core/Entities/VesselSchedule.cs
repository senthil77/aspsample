using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class VesselSchedule : BaseEntity
    {

        public string VesselName { get; set; }
        public string VoyageNo { get; set; }


        public string OriginTerminal { get; set; }
        public DateTime EstArrOriDate { get; set; }
        public DateTime EstBerthDate { get; set; }
        public DateTime EstGateOpenDate { get; set; }
        public DateTime EstCutOffDate { get; set; }
        public DateTime EstDepDate { get; set; }


        public string DestinationTerminal { get; set; }
        public DateTime EstArrDestDate { get; set; }
        public List<ScheduleDetail> Details { get; set; }


        [ForeignKey("OriginPort")]

        public int OriginPortId { get; set; }
        public virtual Port OriginPort { get; set; }


        [ForeignKey("DestinationPort")]

        public int DestinationPortId { get; set; }
        public virtual Port DestinationPort { get; set; }
    }
}
