using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core
{
    public static class Policies
    {
        public const string Admin = "ADMIN";
        public const string Partner = "PARTNER";
        public const string Support = "SUPPORT";
        public const string Vendors = "VENDORS";
        public const string Temp = "TEMP";
 

        public static AuthorizationPolicy AdminPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Admin).Build();
        }

        public static AuthorizationPolicy PartnerPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Partner, Admin).Build();
        }

        public static AuthorizationPolicy VendorsPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Vendors, Admin).Build();
        }

        public static AuthorizationPolicy SupportPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Support, Partner,Vendors,Admin).Build();
        }

        public static AuthorizationPolicy TempPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Support, Temp,Admin).Build();
        }
    }
}
