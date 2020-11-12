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

namespace Freigt_Easy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VesselSchedulesController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IConfiguration _config;
        public VesselSchedulesController(RiaDBContext context, IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }
        // GET: api/VesselSchedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VesselSchedule>>> Get()

        {
            var vesslSchdules = await _repository.ListAllAsyncIncludes<VesselSchedule>(new string[] {
                "Details", "OriginPort", "DestinationPort", "Details.TransitPort"});
            if (vesslSchdules == null)
            {
                return NotFound();
            }


            return vesslSchdules;
        }

        [HttpGet("{id}", Name = "GetVesselSchedules")]
        public async Task<ActionResult<VesselSchedule>> GetVesselSchedules(int id)
        {
            var vesselSchedule = await _repository.GetByIdAsync<VesselSchedule>(x => x.Id == id, new string[] { "OriginPort", "DestinationPort" });

            if (vesselSchedule == null)
            {
                return NotFound();
            }

            return vesselSchedule;
        }

        [HttpGet("Test")]
        public async Task<IEnumerable<VesselRoute>> Get([FromQuery] string requestData)
        {

            string param = requestData.ToString().Replace("}", string.Empty).Replace("}", string.Empty).Replace("code", string.Empty).Trim().ToUpper().ToString().
                     Replace(@"{", string.Empty).Replace(@"""", string.Empty).Replace(":", string.Empty);
            int daycount = 30;
            bool isTrue = int.TryParse(param, out daycount);
            List<VesselRoute> result = new List<VesselRoute>();
            var allSchdules = await _repository.ListAllAsyncConditionInclude<VesselSchedule>(x => x.IsActive == true && x.EstDepDate > DateTime.Now && x.EstDepDate <= DateTime.Now.AddDays(daycount),
                new string[] {
              "Details", "OriginPort", "DestinationPort", "Details.TransitPort" });



            List<VesselRoute> finalSet = new List<VesselRoute>();
            using (Utility uti = new Utility(_repository,_config))
            {
                foreach (var sch in allSchdules)
                {
                    finalSet.AddRange(uti.BuildVesselRoutesEntitites(sch));
                }
            }

            if (daycount > 0)
            {
                result = (from x in finalSet
                          where x.StartDate > DateTime.Now && x.StartDate <= DateTime.Now.AddDays(daycount)
                          select x

                      ).OrderBy(x => x.StartDate).ToList<VesselRoute>();
            }
            else
            {
                result = (from x in finalSet

                          select x

                     ).OrderBy(x => x.StartDate).ToList<VesselRoute>();
            }


            return result;



        }

        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<VesselSchedule>> Post(VesselSchedule vesselSchedule)
        {

            string eMail = string.Empty;
            using (Utility util = new Utility())
            {
                eMail = util.GetEmailclaim(User.Identity as ClaimsIdentity);

            }

            if (vesselSchedule.Id > 0)
            {
                vesselSchedule.UpdatedBy = eMail;
                vesselSchedule.Details.ForEach(i => i.UpdatedBy = eMail);
                await _repository.UpdateAsync<VesselSchedule>(vesselSchedule);
            }
            else
            {
                vesselSchedule.CreatedBy = eMail;
                vesselSchedule.Details.ForEach(i => i.CreatedBy = eMail);
                await _repository.AddAsync<VesselSchedule>(vesselSchedule);




            }
            return await GetVesselSchedules(vesselSchedule.Id);


        }
        // PUT: api/VesselSchedules/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VesselSchedule>> DeleteVesselSchedules(int id)
        {
            var vesselSchedule = await _repository.GetByIdAsync<VesselSchedule>(id);

            if (vesselSchedule == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<VesselSchedule>(vesselSchedule);

            return vesselSchedule;
        }


        [HttpPost, Route("searchschedule")]
        public async Task<ActionResult<IEnumerable<VesselSchedule>>> Searchschedule(SearchSchedule vesselSchedule)
        {
            List<VesselSchedule> finalSet = new List<VesselSchedule>();

            try
            {


                var allSchdules = await _repository.ListAllAsyncConditionInclude<VesselSchedule>(x => x.IsActive == true, new string[] {
              "Details", "OriginPort", "DestinationPort", "Details.TransitPort" });

                var portcodes = new List<string> { vesselSchedule.OriginCity, vesselSchedule.DestinationCity };


                //origin and Dest in header

                var finalSet1 = (from x in allSchdules
                                 where (x.EstDepDate > vesselSchedule.ExpectedDeparture && x.EstDepDate <= vesselSchedule.ExpectedDeparture.AddDays(vesselSchedule.Period) && x.OriginPort.PortCode == vesselSchedule.OriginCity
                                 && x.DestinationPort.PortCode == vesselSchedule.DestinationCity)
                                 select x).ToList<VesselSchedule>();



                var oriHeade_destTransit = allSchdules.Where(x => x.OriginPort.PortCode == vesselSchedule.OriginCity &&
                 x.EstDepDate > vesselSchedule.ExpectedDeparture && x.EstDepDate <= vesselSchedule.ExpectedDeparture.AddDays(vesselSchedule.Period)).SelectMany(foo => foo.Details

                                    .Where(y => y.TransitPort.PortCode == vesselSchedule.DestinationCity && y.IsDeliveryAvailable == true)

                                 ).ToList<ScheduleDetail>().Select(y => y.VesselSchedule).ToList();

                var destHeade_oritTransit = allSchdules.Where(x => x.DestinationPort.PortCode == vesselSchedule.DestinationCity).SelectMany(foo => foo.Details

                             .Where(y => y.TransitPort.PortCode == vesselSchedule.OriginCity && y.ExpDeparture > vesselSchedule.ExpectedDeparture && y.ExpDeparture <= vesselSchedule.ExpectedDeparture.AddDays(vesselSchedule.Period) && y.IsLoadingAvailable == true)

                          ).ToList<ScheduleDetail>().Select(y => y.VesselSchedule).ToList();


                //if (finalSet1.Count > 0)
                //{
                //    var filterted = (from x in finalSet1
                //                     select new
                //                     {
                //                         x.VesselName,
                //                         x.VoyageNo,
                //                         x.OriginPort.PortCode,
                //                         x.OriginPort.PortDescription,
                //                         x.OriginPort.LongDescription,
                //                         x.DestinationPort.PortCode,
                //                         x.DestinationPort.PortDescription,
                //                         x.DestinationPort.LongDescription,
                //                         (x.EstArrOriDate - x.EstArrDestDate)).Days,
                //                         isAnyinTransit=true
                //                         SID=detailID
                //                       DID =0


                //}).ToList();
                //}

                var destTranit_oritTransit = allSchdules.SelectMany(foo => foo.Details

                           .Where(y => y.TransitPort.PortCode == vesselSchedule.OriginCity && y.IsLoadingAvailable == true
                           & y.ExpDeparture <= vesselSchedule.ExpectedDeparture.AddDays(vesselSchedule.Period)
                           || y.TransitPort.PortCode == vesselSchedule.DestinationCity && y.IsDeliveryAvailable == true)


                        ).ToList<ScheduleDetail>().Select(m => m.VesselSchedule).Distinct();


                List<int> idsTransit = new List<int>();
                foreach (var vschedule in destTranit_oritTransit)
                {

                    var isOk = (from x in vschedule.Details
                                where portcodes.Contains(x.TransitPort.PortCode)
                                select x.ScheduleId).ToList().Count > 1;
                    if (isOk)
                    {
                        idsTransit.Add(vschedule.Id);
                    }


                }
                var dest_tr_or_tra = (from x in allSchdules
                                      where idsTransit.ToArray().Contains(x.Id)
                                      select x).ToList<VesselSchedule>();





                finalSet = finalSet1.Union(oriHeade_destTransit).Union(destHeade_oritTransit).Union(dest_tr_or_tra).ToList<VesselSchedule>().Distinct().ToList();




                //foreach (var item in finalSet)
                //{
                //    VesselCharge charge = new VesselCharge();
                //    var oriPort = getOriginPort(vesselSchedule.OriginCity, item);
                //    charge.Id = 1;
                //    charge.OriginPortId = oriPort.superPort.Id;
                //    charge.OriginPort = oriPort.superPort;
                //    charge.StartDate = oriPort.estDepDate;
                //}


            }
            catch (Exception e)
            {
                throw e;
            }
            return finalSet;
            //  return searchEngine.SearchFClValues(vesselSchedule);

        }



        [HttpPost, Route("search")]
        public async Task<ActionResult<IEnumerable<VesselSchedule>>> search(SearchFcl vesselSchedule)
        {
            List<VesselSchedule> finalSet = new List<VesselSchedule>();

            try
            {


                var allSchdules = await _repository.ListAllAsyncConditionInclude<VesselSchedule>(x => x.EstArrOriDate >= vesselSchedule.ExpectedDeparture, new string[] {
              "Details", "OriginPort", "DestinationPort", "Details.TransitPort" });

                var portcodes = new List<string> { vesselSchedule.OriginCity, vesselSchedule.DestinationCity };


                //origin and Dest in header

                var finalSet1 = (from x in allSchdules
                                 where (x.EstArrOriDate >= vesselSchedule.ExpectedDeparture && x.OriginPort.PortCode == vesselSchedule.OriginCity && x.DestinationPort.PortCode == vesselSchedule.DestinationCity)
                                 select x).ToList<VesselSchedule>();

                


                var oriHeade_destTransit = allSchdules.Where(x => x.OriginPort.PortCode == vesselSchedule.OriginCity).SelectMany(foo => foo.Details

                                    .Where(y => y.TransitPort.PortCode == vesselSchedule.DestinationCity && y.IsDeliveryAvailable == true)

                                 ).ToList<ScheduleDetail>().Select(y => y.VesselSchedule).ToList();

               

                var destHeade_oritTransit = allSchdules.Where(x => x.DestinationPort.PortCode == vesselSchedule.DestinationCity).SelectMany(foo => foo.Details

                             .Where(y => y.TransitPort.PortCode == vesselSchedule.OriginCity && y.IsLoadingAvailable == true)

                          ).ToList<ScheduleDetail>().Select(y => y.VesselSchedule).ToList();


          

                var destTranit_oritTransit = allSchdules.SelectMany(foo => foo.Details

                           .Where(y => y.TransitPort.PortCode == vesselSchedule.OriginCity && y.IsLoadingAvailable == true
                           || y.TransitPort.PortCode == vesselSchedule.DestinationCity && y.IsDeliveryAvailable == true)


                        ).ToList<ScheduleDetail>().Select(m => m.VesselSchedule).Distinct();


                List<int> idsTransit = new List<int>();
                foreach (var vschedule in destTranit_oritTransit)
                {

                    var isOk = (from x in vschedule.Details
                                where portcodes.Contains(x.TransitPort.PortCode)
                                select x.ScheduleId).ToList().Count > 1;
                    if (isOk)
                    {
                        idsTransit.Add(vschedule.Id);
                    }


                }
                var dest_tr_or_tra = (from x in allSchdules
                                      where idsTransit.ToArray().Contains(x.Id)
                                      select x).ToList<VesselSchedule>();


               
                var child = allSchdules.Select(x => x.Details.Where(x => portcodes.Contains(x.TransitPort.PortCode)).GroupBy(y => y.ScheduleId)).ToList();


                finalSet = finalSet1.Union(oriHeade_destTransit).Union(destHeade_oritTransit).Union(dest_tr_or_tra).ToList<VesselSchedule>().Distinct().ToList();



                // var childData = _repository.FindFew<ScheduleDetail>(x => allScheuledId.Contains(x.ScheduleId) && portcodes.Contains
                //(x.TransitPort.PortCode) && x.ExpArrival >= vesselSchedule.ExpectedDeparture
                //&& x.IsLoadingAvailable == true).Result.ToList();
                var values = allSchdules.SelectMany(foo => foo.Details

                                  .Where(x => x.TransitPort.PortCode == vesselSchedule.OriginCity && x.IsLoadingAvailable == true)

                                  ).ToList<ScheduleDetail>();




            }
            catch (Exception e)
            {
                throw e;
            }
            return finalSet;
            //  return searchEngine.SearchFClValues(vesselSchedule);

        }
    }
}