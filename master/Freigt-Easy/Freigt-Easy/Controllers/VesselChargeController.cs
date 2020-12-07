using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Freigt_Easy.Core;
using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Freigt_Easy.Core.Helpers;
using Freigt_Easy.Core.POCO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VesselChargeController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        public VesselChargeController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
        // GET: api/VesselCharge
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VesselCharge>>> Get()

        {



            List<VesselCharge> returnList = new List<VesselCharge>();


            var result = await _repository.ListAllAsyncConditionInclude<VesselCharge>(x=>x.IsActive, new string[] { "DestinationPort", "Currency", "OriginPort", "Package", "Partner", "VesselSchedule", "ChargedAt" });

 
                var allTrips = await _repository.ListAllAsyncConditionInclude<VesselSchedule>(x => x.IsActive == true, new string[] {
                "Details", "OriginPort", "DestinationPort", "Details.TransitPort"});
                var currencyCode = _config["BaseValues:CurrencyCode"];

                List<VesselCharge> finalList = new List<VesselCharge>();

                foreach (var veseelSch in allTrips)
                {


                    using (Utility uti = new Utility(_repository, _config))
                    {
                        finalList.AddRange(uti.BuildVesselChargeEntitites(veseelSch, currencyCode));

                    }
                }

                if (finalList.Count == result.Count)
                {
                    returnList = result;
                }
                else
                {
                    var obj2 = finalList.Where(x => !result.Any(y => y.VesselScheduleId == x.VesselScheduleId && y.PackageId == x.PackageId && y.PartnerId == x.PartnerId
                    && y.OriginPortId == x.OriginPortId && y.DestinationPortId == x.DestinationPortId))
                        .ToList<VesselCharge>();

                    result.AddRange(obj2);


                    returnList = result;
                }
            
            return returnList;


        }


        [HttpGet("Test")]
        public async Task<ActionResult<IEnumerable<VesselCharge>>> GetByActive([FromQuery] string requestData)
        {



            

            ParamQuery json = JsonConvert.DeserializeObject<ParamQuery>(requestData);

            List<VesselCharge> returnList = new List<VesselCharge>();



            if (json.IsActive == false)
            {

                if (json.RoleName=="ADMIN" || json.RoleName == "SUPPORT")
                {
                   return await Get();
                }
                else { 
                var allTrips = await _repository.ListAllAsyncConditionInclude<VesselSchedule>(x => x.IsActive == true, new string[] {
                "Details", "OriginPort", "DestinationPort", "Details.TransitPort"});
                var currencyCode = _config["BaseValues:CurrencyCode"];
                List<VesselCharge> finalList = new List<VesselCharge>();

                foreach (var veseelSch in allTrips)
                {
                    using (Utility uti = new Utility(_repository, _config))
                    {
                        finalList.AddRange(uti.BuildVesselChargeEntititesForPartner(veseelSch, currencyCode, json.PartnerId));
                    }
                }
                var result = await _repository.ListAllAsyncConditionInclude<VesselCharge>(x => x.PartnerId == json.PartnerId, new string[] { "DestinationPort", "Currency", "OriginPort", "Package", "Partner", "VesselSchedule", "ChargedAt" });

                if (result.Count == 0)
                {
                    returnList = finalList;
                }
                else
                {

                    if (finalList.Count == result.Count)
                    {
                        returnList = result;
                    }
                    else
                    {
                        var obj2 = finalList
                        .Where(x => !result.Any(y => y.VesselScheduleId == x.VesselScheduleId && y.PackageId == x.PackageId && y.PartnerId == x.PartnerId
                        && y.OriginPortId == x.OriginPortId && y.DestinationPortId == x.DestinationPortId))

                        .ToList<VesselCharge>();

                        result.AddRange(obj2);


                        returnList = result;
                    }
                }
            }
            }
            else
            {

                if (json.RoleName == "ADMIN" || json.RoleName == "SUPPORT")
                {
                    returnList = await _repository.ListAllAsyncConditionInclude<VesselCharge>(x => x.IsActive == json.IsActive,
                       new string[] { "DestinationPort", "Currency", "OriginPort", "Package", "Partner", "VesselSchedule", "ChargedAt" });
                }
                else
                {
                    returnList = await _repository.ListAllAsyncConditionInclude<VesselCharge>(x => x.IsActive == json.IsActive && x.PartnerId == json.PartnerId,
                        new string[] { "DestinationPort", "Currency", "OriginPort", "Package", "Partner", "VesselSchedule", "ChargedAt" });
                }
            }



           

            return returnList;



        }
        //// GET: api/VesselCharge/5
        [HttpGet("{id}", Name = "GetVesselCharge")]
        public async Task<ActionResult<VesselCharge>> GetVesselCharge(int id)
        {
            var vesselCharge = await _repository.GetByIdAsync<VesselCharge>(x => x.Id == id, new string[] { "DestinationPort", "Currency", "OriginPort", "Package", "Partner", "VesselSchedule" });


            if (vesselCharge == null)
            {
                return NotFound();
            }

            return vesselCharge;
        }
        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<VesselCharge>> Post(VesselCharge vesselCharge)
        {

            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
                eMail = util.GetEmailclaim(User.Identity as ClaimsIdentity);

            }
            if (vesselCharge.Id > 0)
            {
                vesselCharge.UpdatedBy = eMail;
                await _repository.UpdateAsync<VesselCharge>(vesselCharge);
            }
            else
            {
                vesselCharge.CreatedBy = eMail;
                await _repository.AddAsync<VesselCharge>(vesselCharge);


            }

            return await GetVesselCharge(vesselCharge.Id);

        }
        // PUT: api/VesselCharge/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/VesselCharge/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VesselCharge>> DeleteVesselCharge(int id)
        {
            var vesselCharge = await _repository.GetByIdAsync<VesselCharge>(id);

            if (vesselCharge == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<VesselCharge>(vesselCharge);

            return vesselCharge;
        }

        [HttpPost, Route("search")]
        public async Task<ActionResult<IEnumerable<VesselCharge>>> search(SearchSchedulesWithPackage vesselSchedule)
        {
            List<VesselCharge> finalSet = new List<VesselCharge>();
            List<int> portIds = new List<int> { vesselSchedule.OriginCity, vesselSchedule.DestinationCity };


            try
            {


                var allSchdules = await _repository.ListAllAsyncConditionInclude<VesselCharge>(x =>
                    x.IsActive == true
                  && x.Charges != null
                 && x.StartDate >= vesselSchedule.ExpectedDeparture
                 && x.OriginPortId == vesselSchedule.OriginCity
                 && x.DestinationPortId == vesselSchedule.DestinationCity
                 && x.PackageId == vesselSchedule.PackageId,


                new string[]
                 {  "Currency", "OriginPort" , "Package", "Partner","VesselSchedule", "VesselSchedule.DestinationPort",
                     "VesselSchedule.OriginPort", "VesselSchedule.Details", "VesselSchedule.Details.TransitPort","ChargedAt","Charges","Charges.ChargeDetails","Charges.OriginCurrency",
                     "Charges.DestinationCurrency","Charges.ChargeDetails.ChargeDetail","Charges.ChargeDetails.ChargeDetail.ChargedAt"


                 }); ;


            



                return allSchdules;


            }
            catch (Exception e)
            {
                throw e;
            }

            

        }
    }
}