using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class Package : BaseEntity
    {
        public string PackageName { get; set; }
        public string Description { get; set; }
    }
}
