using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class Port : BaseEntity
    {

        public string PortCode { get; set; }
        public string CityCode { get; set; }
        public string CountryCode { get; set; }
        public string CityDescription { get; set; }
        public string PortDescription { get; set; }
        public string LongDescription { get; set; }
        public string CountryDescription { get; set; }
    }
}
