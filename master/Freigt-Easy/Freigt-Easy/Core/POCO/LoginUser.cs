using Freigt_Easy.Core.Entities;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.POCO
{
    public class LoginUser
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class FxRate
    {
        public string Key { get; set; }
        public float Rate { get; set; }
    }

    public class SearchFcl
    {
        public int BlCount { get; set; }
        public string Commodity { get; set; }
        public string CommodityType { get; set; }
        public string DestinationCity { get; set; }
        public DateTime ExpectedDeparture { get; set; }
        public string OriginCity { get; set; }
        public string PackageType { get; set; }
        public int Period { get; set; }
        public int Qty { get; set; }

    }
    public class SearchSchedulesWithPackage
    {
        public int BlCount { get; set; }
        public string Commodity { get; set; }
        public string CommodityType { get; set; }
        public int DestinationCity { get; set; }
        public DateTime ExpectedDeparture { get; set; }
        public int OriginCity { get; set; }
        public int PackageId { get; set; }
        public int Period { get; set; }
        public int Qty { get; set; }

    }

    public class SearchSchedule
    {

        public string DestinationCity { get; set; }
        public DateTime ExpectedDeparture { get; set; }
        public string OriginCity { get; set; }


        public int Period { get; set; }

    }

    public class EmailMessage
    {
        public MailboxAddress Sender { get; set; }
        public MailboxAddress Reciever { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
    public class PortRoute
    {
        public int OriginPortId { get; set; }
        public int DestinationPortId { get; set; }
    }

    public class VesselRoute : PortRoute
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public Port OriginPort { get; set; }
        public Port DestinationPort { get; set; }
        public VesselSchedule Schedule { get; set; }

    }

    public class ParamQuery { 
    
        public bool IsActive { get; set; }
        public int PartnerId { get; set; }
    }
}
