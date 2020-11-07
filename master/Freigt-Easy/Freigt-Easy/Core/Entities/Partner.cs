using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class Partner : BaseEntity
    {

        public string PartnerName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Contact1 { get; set; }
        public string Contact2 { get; set; }
        public bool IsSusbcribed { get; set; }
        public DateTime ValidUpTo { get; set; }

 



    }
}
