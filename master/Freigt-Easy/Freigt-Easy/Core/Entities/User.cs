using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Freigt_Easy.Core.Entities
{
    public class User : BaseEntity
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public string ActivationCode { get; set; }
        [ForeignKey("userRole")]
        public int UserRoleId { get; set; }
        public UserRole UserRole { get; set; }

        [ForeignKey("partner")]
        public int? PartnerId { get; set; }
        public Partner Partner { get; set; }

    }
}
