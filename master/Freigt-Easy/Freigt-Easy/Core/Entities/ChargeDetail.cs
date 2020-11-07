using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class ChargeDetail : BaseEntity
    {
        public string Name { get; set; }

        [ForeignKey("ChargedAtdetails")]
        public int ChargedAtId { get; set; }
        public ChargedAt ChargedAt { get; set; } //origin //Destination

    }
}
