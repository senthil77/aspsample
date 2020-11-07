using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class Currency : BaseEntity
    {

        public string CurrencyCode { get; set; }
        public string Description { get; set; }
    }
}
