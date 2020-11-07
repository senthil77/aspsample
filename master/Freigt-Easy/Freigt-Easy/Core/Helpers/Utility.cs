using Freigt_Easy.Core.DBHelper;
using Freigt_Easy.Core.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
 
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Freigt_Easy.Core.POCO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using MailKit.Security;
using System.IO;

namespace Freigt_Easy.Core.Helpers
{

 
    public class Utility : IDisposable
    {

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }


       public string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            int iTimeOut = 15;
            bool b = int.TryParse(_config["Jwt:TimeOut"], out iTimeOut);
            int partnerId = 0;
            if (userInfo.Partner != null)
            {
                partnerId = userInfo.Partner.Id;
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.CompanyName),
                new Claim("firstName", userInfo.FirstName.ToString()),
                new Claim("email",userInfo.Email),
                new Claim("roleName",userInfo.UserRole.RoleName.ToString()),
                new Claim("userId", userInfo.Id.ToString()),
                new Claim("fullName", userInfo.FirstName.ToString() + " " + userInfo.LastName),
                new Claim("partnerId", partnerId.ToString())
               
               // new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(iTimeOut),
                signingCredentials: credentials

            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public async Task<QuoteTripCharge> BuildQuoteTrip(int vesselChargeId)
        {


            return new QuoteTripCharge
            {
                Id = 0,
                IsActive = false,
                OriginCurrencyId = 1, //todo:MErge and check uSD
                DestinationCurrencyId = 1, //todo://merge and check USD
                DestinationCharges = 0,
                OriginCharges = 0,
                ChargeDetails = await buildQuoteChargeDetails(vesselChargeId),
                CreatedBy = "senthil",
                CreatedAt = new DateTime(),
                UpdatedAt = new DateTime(),
                UpdatedBy = "senthil",
                VesselChargeId = vesselChargeId,

            };
        }

        public async Task updateUser(string emailId, int partnerId)
        {
            var user = _repository.FindSingle<User>(x => x.Email == emailId);
            user.PartnerId = partnerId;
            await _repository.UpdateAsync(user);
        }

        private async Task<List<QuoteTripChargeDetail>> buildQuoteChargeDetails(int vesselChargeId)
        {

            List<QuoteTripChargeDetail> finalList = new List<QuoteTripChargeDetail>();

            var chargeDetails = await _repository.ListAllAsync<ChargeDetail>();
            foreach (var chargeDetail in chargeDetails)
            {
                QuoteTripChargeDetail qChargeDetail = new QuoteTripChargeDetail()
                {

                    Id = 0,
                    ChargeAmount = 100,
                    ChargeDetailId = chargeDetail.Id,
                    ChargeDetail = chargeDetail,
                    QuoteTripChargeId = 0,
                    IsActive = false,

                    CreatedBy = "senthil",
                    CreatedAt = new DateTime(),
                    UpdatedAt = new DateTime(),
                    UpdatedBy = "senthil",

                };


                finalList.Add(qChargeDetail);
            }

            return finalList;
        }

        public async Task SendWelcomeEmailAsync(string toEmail,string toName, string activationCode)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\welcomeTemplate.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();


            var userName = _config["BaseValues:userName"];
            var password = _config["BaseValues:password"];
            var host = _config["BaseValues:host"];
            var fromEmail = _config["BaseValues:from"];
            var ccEmail = _config["BaseValues:cc"];
            var verifyLink = _config["BaseValues:qualifiedURL"] + "activate?token=" + activationCode;

            MailText = MailText.Replace("[username]", toName).Replace("[email]", toEmail).Replace("[activeLink]", verifyLink);
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(fromEmail);
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Cc.Add(MailboxAddress.Parse(fromEmail));
            email.Subject = $"Welcome {toName}";
            var builder = new BodyBuilder();
            builder.HtmlBody = MailText;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(host, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(userName,password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }


        private MimeMessage CreateEmailMessage(EmailMessage message)
        {

 

            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(message.Sender);
            mimeMessage.To.Add(message.Reciever);
            mimeMessage.Cc.Add(message.Sender);
            mimeMessage.Subject = message.Subject;
            
            mimeMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            { Text = message.Content };
            return mimeMessage;
        }
        public async Task SendMailKit(string toEmail, string subject, string messageBody, string toName)
        {

            using (SmtpClient smtpClient = new SmtpClient())
            {

     

                var userName = _config["BaseValues:userName"];
                var password = _config["BaseValues:password"];
                var host = _config["BaseValues:host"];
                var fromEmail = _config["BaseValues:from"];
                var ccEmail = _config["BaseValues:cc"];

 


                EmailMessage message = new EmailMessage();
                message.Sender = new MailboxAddress("Anitha", fromEmail);
                message.Reciever = new MailboxAddress(toName, toEmail);
              
                message.Subject = subject;
                message.Content = messageBody;
                var mimeMessage = CreateEmailMessage(message);

     

                smtpClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                await smtpClient.ConnectAsync(host,
                587, SecureSocketOptions.StartTls);
               await smtpClient.AuthenticateAsync(userName,
                password);
               await smtpClient.SendAsync(mimeMessage);
                await smtpClient.DisconnectAsync(true);
            }
        }

               public IEnumerable<VesselRoute> BuildVesselRoutesEntitites(VesselSchedule schedule)
        {


            List<VesselRoute> finalList = new List<VesselRoute>();

            finalList.Add(new VesselRoute()
            {
                DestinationPortId = schedule.DestinationPortId,
                OriginPortId = schedule.OriginPortId,
                StartDate = schedule.EstDepDate,
                OriginPort=schedule.OriginPort,
                DestinationPort=schedule.DestinationPort,
                EndDate = schedule.EstArrDestDate,
                Schedule= schedule,


            });
 

            if (schedule.Details != null)
            {

                //source -origin and trasits as Destination X partner x Package
                var isDeleiveryAvailableList = schedule.Details.FindAll(x => x.IsDeliveryAvailable == true).ToList<ScheduleDetail>();
                foreach (ScheduleDetail detail in isDeleiveryAvailableList)
                {

                    VesselRoute route = new VesselRoute()
                    {

                        StartDate = schedule.EstDepDate,
                        EndDate = detail.ExpArrival,
                        DestinationPortId = detail.TransitPortId,
                        OriginPortId = schedule.OriginPortId,

                        OriginPort = schedule.OriginPort,
                        DestinationPort = detail.TransitPort,
                        Schedule = schedule,


                    };
                    finalList.Add(route);


                }

                var isLoadingAvailable = schedule.Details.FindAll(x => x.IsLoadingAvailable == true).ToList<ScheduleDetail>();

                foreach (ScheduleDetail detail in isLoadingAvailable)
                {
                    VesselRoute route = new VesselRoute()
                    {
                        StartDate = detail.ExpDeparture,
                        EndDate = schedule.EstArrDestDate,


                        OriginPort = detail.TransitPort,
                        DestinationPort = schedule.DestinationPort,

                        DestinationPortId = schedule.DestinationPortId,
                        OriginPortId = detail.TransitPortId,

                        Schedule = schedule,




                    };
                    finalList.Add(route);
                }

                foreach (ScheduleDetail source in isLoadingAvailable)//this becomes source
                {
                    foreach (ScheduleDetail destination in isDeleiveryAvailableList)
                    {
                        if (source.Id != destination.Id && source.ExpArrival < destination.ExpArrival)
                        {

                            VesselRoute route = new VesselRoute()
                            {
                                StartDate = source.ExpDeparture,
                                EndDate = destination.ExpArrival,

                                OriginPort = source.TransitPort,
                                DestinationPort = destination.TransitPort,


                                DestinationPortId = destination.TransitPortId,
                                OriginPortId = source.TransitPortId,
                                Schedule = schedule,

                            };
                            finalList.Add(route);


                        }
                    }
                }
            }
            return finalList;
        }
        //    public async Task SendMail(string toEmail, string subject, string message)
        //{

        //    bool isEnabled = false;





        //    try
        //    {


        //        var result = Boolean.TryParse(_config["BaseValues:EnableSSLOnMail"], out isEnabled);
        //        var userName = _config["BaseValues:userName"];
        //        var password = _config["BaseValues:password"];
        //        var host = _config["BaseValues:host"];
        //        var fromEmail = _config["BaseValues:from"];
        //        var ccEmail = _config["BaseValues:cc"];

        //        SmtpClient SmtpMail = new SmtpClient();
        //        SmtpMail.EnableSsl = isEnabled;
        //        SmtpMail.UseDefaultCredentials = false;

        //        SmtpMail.Host = host;
        //        SmtpMail.Port = 587;
        //        SmtpMail.DeliveryMethod = SmtpDeliveryMethod.Network;
        //        SmtpMail.Credentials = new System.Net.NetworkCredential(userName, password);

        //        MailMessage objMail = new MailMessage(fromEmail, toEmail);
        //        objMail.Subject = subject;

        //        objMail.CC.Add(ccEmail);

        //        objMail.Body = message;
        //        objMail.IsBodyHtml = true;
        //        await SmtpMail.SendMailAsync(objMail);
        //        //await SmtpMail.Send(objMail);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //    finally
        //    {
        //    }
        //}

        public async Task SendVerificationLink(string emailId, string activationCode,string toName)
        {


            var URL = _config["BaseValues:qualifiedURL"] + "/activate?token=" + activationCode;

            var sr = GetTemplate(URL,toName);


            await SendMailKit(emailId, sr["subject"].ToString(), sr["body"].ToString(),toName);
        }
        public StringDictionary GetTemplate(string verifyUrl,string toName)
        {
            StringDictionary sr = new StringDictionary();

            sr.Add("subject", "Your account is successfull created");
            sr.Add("body", " Dear " + toName  +  "<br/><br/>We are excited to tell you that your account is" +
        " successfully created. Please click on the below link to verify your account" +
        " <br/><br/><a href='" + verifyUrl + "'>" + verifyUrl + "</a> ");

            return sr;
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~Utility()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
        private readonly IConfiguration _config;
        private readonly IRepository _repository;
        public Utility(IRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }




        //public IEnumerable<VesselRoute> BuildVesselRoutesEntitites(VesselSchedule schedule)
        //{


        //    List<VesselRoute> finalList = new List<VesselRoute>();

        //    finalList.Add(new VesselRoute()
        //    {
        //        DestinationPortId = schedule.DestinationPortId,
        //        OriginPortId = schedule.OriginPortId,
        //        StartDate = schedule.EstDepDate,
        //        OriginPort = schedule.OriginPort,
        //        DestinationPort = schedule.DestinationPort,
        //        EndDate = schedule.EstArrDestDate,
        //        Schedule = schedule,


        //    });


        //    if (schedule.Details != null)
        //    {

        //        //source -origin and trasits as Destination X partner x Package
        //        var isDeleiveryAvailableList = schedule.Details.FindAll(x => x.IsDeliveryAvailable == true).ToList<ScheduleDetail>();
        //        foreach (ScheduleDetail detail in isDeleiveryAvailableList)
        //        {

        //            VesselRoute route = new VesselRoute()
        //            {

        //                StartDate = schedule.EstDepDate,
        //                EndDate = detail.ExpArrival,
        //                DestinationPortId = detail.TransitPortId,
        //                OriginPortId = schedule.OriginPortId,

        //                OriginPort = schedule.OriginPort,
        //                DestinationPort = detail.TransitPort,
        //                Schedule = schedule,


        //            };
        //            finalList.Add(route);


        //        }

        //        var isLoadingAvailable = schedule.Details.FindAll(x => x.IsLoadingAvailable == true).ToList<ScheduleDetail>();

        //        foreach (ScheduleDetail detail in isLoadingAvailable)
        //        {
        //            VesselRoute route = new VesselRoute()
        //            {
        //                StartDate = detail.ExpDeparture,
        //                EndDate = schedule.EstArrDestDate,


        //                OriginPort = detail.TransitPort,
        //                DestinationPort = schedule.DestinationPort,

        //                DestinationPortId = schedule.DestinationPortId,
        //                OriginPortId = detail.TransitPortId,

        //                Schedule = schedule,




        //            };
        //            finalList.Add(route);
        //        }

        //        foreach (ScheduleDetail source in isLoadingAvailable)//this becomes source
        //        {
        //            foreach (ScheduleDetail destination in isDeleiveryAvailableList)
        //            {
        //                if (source.Id != destination.Id && source.ExpArrival < destination.ExpArrival)
        //                {

        //                    VesselRoute route = new VesselRoute()
        //                    {
        //                        StartDate = source.ExpDeparture,
        //                        EndDate = destination.ExpArrival,

        //                        OriginPort = source.TransitPort,
        //                        DestinationPort = destination.TransitPort,


        //                        DestinationPortId = destination.TransitPortId,
        //                        OriginPortId = source.TransitPortId,
        //                        Schedule = schedule,

        //                    };
        //                    finalList.Add(route);


        //                }
        //            }
        //        }
        //    }
        //    return finalList;
        //}
        ////private List<StdCharge> BuildStdCharges(int portchargeId)
        ////{

        ////    List<StdCharge> finalList = new List<StdCharge>();
        ////    foreach (var pack in _repository.ListAllAsync<Package>().Result)
        ////    {
        ////        foreach (var chargeDetail in _repository.ListAllAsync<ChargeDetail>().Result)
        ////        {
        ////            StdCharge cd = new StdCharge()
        ////            {

        ////                Id = 0,
        ////                ChargeAmount = 100,
        ////                ChargeDetailId = chargeDetail.Id,
        ////                ChargeDetail = chargeDetail,
        ////                ChargeType = chargeDetail.ChargeType,
        ////                IsActive = true,
        ////                PortChargeId = 0,
        ////                CreatedBy = "senthil",
        ////                CreatedAt = new DateTime(),
        ////                UpdatedAt = new DateTime(),
        ////                UpdatedBy = "senthil",
        ////                PackageId = pack.Id,
        ////                Package = pack,
        ////            };


        ////            finalList.Add(cd);
        ////        }


        ////    }

        ////    return finalList;
        ////}
        ////public List<StandardCharge> BuildOpertorChargeEntity(int partnerId)
        ////{
        ////    List<StandardCharge> finalList = new List<StandardCharge>();
        ////    foreach (Package pck in _repository.ListAllAsync<Package>().Result)
        ////    {
        ////        foreach (ChargeDetail detail in _repository.ListAllAsync<ChargeDetail>().Result)
        ////        {

        ////            foreach (PortRoute entry in GetPorts())
        ////            {
        ////                StandardCharge stdCharge = new StandardCharge()
        ////                {
        ////                    PartnerId = partnerId,
        ////                    EffectiveFrom = DateTime.Now,
        ////                    PackageId = pck.Id,
        ////                    CurrencyId = 1,
        ////                    OriginPortId = entry.OriginPortId,
        ////                    DestinationPortId = entry.DestinationPortId,
        ////                    ChargedAtId = 1,
        ////                    ChargeAmount = 2000,
        ////                    ChargeDetailId = detail.Id,
        ////                    IsActive = true,

        ////                    CreatedBy = "senthil",
        ////                    CreatedAt = new DateTime(),
        ////                    UpdatedAt = new DateTime(),
        ////                    UpdatedBy = "senthil",


        ////                    ChargeTypeId=1,
        ////                    Id= 0,


        ////                };

        ////                finalList.Add(stdCharge);
        ////            }
        ////        }
        ////    }

        ////    return finalList;
        ////}

        //public List<PortRoute> GetPorts()
        //{

        //    List<PortRoute> portRoutes = new List<PortRoute>();
        //    var sourcePorts = _repository.ListAllAsync<Port>().Result;
        //    var destinationPorts = sourcePorts;

        //    foreach (Port port in sourcePorts)
        //    {
        //        foreach (Port destPort in destinationPorts)
        //        {
        //            if (port.Id != destPort.Id && port.CityCode != destPort.CityCode)
        //            {
        //                portRoutes.Add(new PortRoute()
        //                {
        //                    OriginPortId = port.Id,
        //                    DestinationPortId = destPort.Id
        //                });
        //            }


        //        }


        //    }

        //    return portRoutes;

        //}

        public List<VesselCharge> BuildVesselChargeEntititesForPartner(VesselSchedule schedule, string currencyCode, int partnerId)
        {
            List<VesselCharge> finalList = new List<VesselCharge>();

            int currencyId = 1;
            var currency = _repository.FindSingle<Currency>(x => x.CurrencyCode == currencyCode);
            currencyId = currency == null ? 1 : currency.Id;

            int chargedAtId = 1;
            var chargedAt = _repository.FindSingle<ChargedAt>(x => x.Name == "ORIGIN");
            chargedAtId = chargedAt == null ? 1 : chargedAt.Id;


            var pckList = _repository.ListAllAsyncWhere<Package>(x => x.IsActive == true).Result;
            var prtner = _repository.FindSingle<Partner>(x=>x.Id==partnerId);

            //Source and DEstination x Partner X Package 
            foreach (Package pck in pckList)
            {
                
                    VesselCharge charge = new VesselCharge()
                    {
                        ChargedAtId = chargedAtId,
                        ChargeAmount = 200,
                        ChargeDetail = "STD",
                        PackageId = pck.Id,
                        CurrencyId = currencyId,
                        StartDate = schedule.EstDepDate,
                        EndDate = schedule.EstArrDestDate,
                        CreatedBy = "senthil",
                        CreatedAt = new DateTime(),
                        DestinationPortId = schedule.DestinationPortId,
                        OriginPortId = schedule.OriginPortId,
                        PartnerId = prtner.Id,
                        IsActive = false,
                        VesselScheduleId = schedule.Id,
                        ChargeType = "chargeType",
                        UpdatedAt = new DateTime(),
                        UpdatedBy = "senthil",
                        VesselSchedule = schedule,
                        Package = pck,
                        Partner = prtner,
                        Currency = currency,
                        DestinationPort = schedule.DestinationPort,

                        OriginPort = schedule.OriginPort,
                        ChargedAt = chargedAt,





                    };
                    finalList.Add(charge);


                 
            }

            if (schedule.Details != null)
            {

                //source -origin and trasits as Destination X partner x Package
                var isDeleiveryAvailableList = schedule.Details.FindAll(x => x.IsDeliveryAvailable == true).ToList<ScheduleDetail>();
                foreach (ScheduleDetail detail in isDeleiveryAvailableList)
                {
                    foreach (Package pck in pckList)
                    {
                         
                            VesselCharge charge = new VesselCharge()
                            {
                                ChargedAtId = chargedAtId,
                                ChargeAmount = 200,
                                ChargeDetail = "STD",
                                PackageId = pck.Id,
                                CurrencyId = 1,
                                StartDate = schedule.EstDepDate,
                                EndDate = detail.ExpArrival,
                                CreatedBy = "senthil",
                                CreatedAt = new DateTime(),
                                DestinationPortId = detail.TransitPortId,
                                OriginPortId = schedule.OriginPortId,
                                PartnerId = prtner.Id,
                                IsActive = false,
                                VesselScheduleId = schedule.Id,
                                ChargeType = "chargeType",
                                UpdatedAt = new DateTime(),
                                UpdatedBy = "senthil",
                                VesselSchedule = schedule,
                                Package = pck,
                                Partner = prtner,
                                Currency = currency,
                                DestinationPort = detail.TransitPort,

                                OriginPort = schedule.OriginPort,
                                ChargedAt = chargedAt



                            };
                            finalList.Add(charge);
                        
                    }

                }


                //source from transit and Destination x partner x package
                var isLoadingAvailable = schedule.Details.FindAll(x => x.IsLoadingAvailable == true).ToList<ScheduleDetail>();

                foreach (ScheduleDetail detail in isLoadingAvailable)
                {
                    foreach (Package pck in pckList)
                    {
                        
                            VesselCharge charge = new VesselCharge()
                            {
                                ChargedAtId = chargedAtId,
                                ChargeAmount = 200,
                                ChargeDetail = "STD",
                                PackageId = pck.Id,
                                CurrencyId = 1,
                                CreatedBy = "senthil",
                                StartDate = detail.ExpDeparture,
                                EndDate = schedule.EstArrDestDate,
                                CreatedAt = new DateTime(),
                                DestinationPortId = schedule.DestinationPortId,
                                OriginPortId = detail.TransitPortId,
                                PartnerId = prtner.Id,
                                IsActive = false,
                                VesselScheduleId = schedule.Id,
                                ChargeType = "chargeType",
                                UpdatedAt = new DateTime(),
                                UpdatedBy = "senthil",
                                VesselSchedule = schedule,
                                Package = pck,
                                Partner = prtner,
                                Currency = currency,
                                DestinationPort = schedule.DestinationPort,

                                OriginPort = detail.TransitPort,
                                ChargedAt = chargedAt,



                            };
                            finalList.Add(charge);
                        
                    }

                }


                //transit 1 as source and transit 2...n as Destinaition x partner x package

                foreach (ScheduleDetail source in isLoadingAvailable)//this becomes source
                {
                    foreach (ScheduleDetail destination in isDeleiveryAvailableList)
                    {
                        if (source.Id != destination.Id && source.ExpArrival < destination.ExpArrival)
                        {
                            foreach (Package pck in pckList)
                            {
                                
                                    VesselCharge charge = new VesselCharge()
                                    {
                                        ChargedAtId = chargedAtId,
                                        ChargeAmount = 200,
                                        ChargeDetail = "STD",
                                        PackageId = pck.Id,
                                        CurrencyId = 1,
                                        StartDate = source.ExpDeparture,
                                        EndDate = destination.ExpArrival,
                                        CreatedBy = "senthil",
                                        CreatedAt = new DateTime(),
                                        DestinationPortId = destination.TransitPortId,
                                        OriginPortId = source.TransitPortId,
                                        PartnerId = prtner.Id,
                                        IsActive = false,
                                        VesselScheduleId = schedule.Id,
                                        ChargeType = "chargeType",
                                        UpdatedAt = new DateTime(),
                                        UpdatedBy = "senthil",

                                        VesselSchedule = schedule,
                                        Package = pck,
                                        Partner = prtner,
                                        Currency = currency,
                                        DestinationPort = destination.TransitPort, // _repository.FindSingle<Port>(x => x.Id == destination.TransitPortId),

                                        OriginPort = source.TransitPort,// _repository.FindSingle<Port>(x => x.Id == source.TransitPortId),
                                        ChargedAt = chargedAt,

                                    };
                                    finalList.Add(charge);


                                
                            }
                        }

                    }
                }

            }
            return finalList;
        }



        public List<VesselCharge> BuildVesselChargeEntitites(VesselSchedule schedule, string currencyCode)
        {
            List<VesselCharge> finalList = new List<VesselCharge>();

            int currencyId = 1;
            var currency = _repository.FindSingle<Currency>(x => x.CurrencyCode == currencyCode);
            currencyId = currency == null ? 1 : currency.Id;

            int chargedAtId = 1;
            var chargedAt = _repository.FindSingle<ChargedAt>(x => x.Name == "ORIGIN");
            chargedAtId = chargedAt == null ? 1 : chargedAt.Id;


            var pckList = _repository.ListAllAsyncWhere<Package>(x => x.IsActive == true).Result;
            var partnerList = _repository.ListAllAsyncWhere<Partner>(x => x.IsActive == true).Result;

            //Source and DEstination x Partner X Package 
            foreach (Package pck in pckList)
            {
                foreach (Partner prtner in partnerList)
                {
                    VesselCharge charge = new VesselCharge()
                    {
                        ChargedAtId = chargedAtId,
                        ChargeAmount = 200,
                        ChargeDetail = "STD",
                        PackageId = pck.Id,
                        CurrencyId = currencyId,
                        StartDate = schedule.EstDepDate,
                        EndDate = schedule.EstArrDestDate,
                        CreatedBy = "senthil",
                        CreatedAt = new DateTime(),
                        DestinationPortId = schedule.DestinationPortId,
                        OriginPortId = schedule.OriginPortId,
                        PartnerId = prtner.Id,
                        IsActive = false,
                        VesselScheduleId = schedule.Id,
                        ChargeType = "chargeType",
                        UpdatedAt = new DateTime(),
                        UpdatedBy = "senthil",
                        VesselSchedule = schedule,
                        Package = pck,
                        Partner = prtner,
                        Currency = currency,
                        DestinationPort = schedule.DestinationPort,

                        OriginPort = schedule.OriginPort,
                        ChargedAt = chargedAt,





                    };
                    finalList.Add(charge);


                }
            }

            if (schedule.Details != null)
            {

                //source -origin and trasits as Destination X partner x Package
                var isDeleiveryAvailableList = schedule.Details.FindAll(x => x.IsDeliveryAvailable == true).ToList<ScheduleDetail>();
                foreach (ScheduleDetail detail in isDeleiveryAvailableList)
                {
                    foreach (Package pck in pckList)
                    {
                        foreach (Partner prtner in partnerList)
                        {
                            VesselCharge charge = new VesselCharge()
                            {
                                ChargedAtId = chargedAtId,
                                ChargeAmount = 200,
                                ChargeDetail = "STD",
                                PackageId = pck.Id,
                                CurrencyId = 1,
                                StartDate = schedule.EstDepDate,
                                EndDate = detail.ExpArrival,
                                CreatedBy = "senthil",
                                CreatedAt = new DateTime(),
                                DestinationPortId = detail.TransitPortId,
                                OriginPortId = schedule.OriginPortId,
                                PartnerId = prtner.Id,
                                IsActive = false,
                                VesselScheduleId = schedule.Id,
                                ChargeType = "chargeType",
                                UpdatedAt = new DateTime(),
                                UpdatedBy = "senthil",
                                VesselSchedule = schedule,
                                Package = pck,
                                Partner = prtner,
                                Currency = currency,
                                DestinationPort = detail.TransitPort,

                                OriginPort = schedule.OriginPort,
                                ChargedAt = chargedAt



                            };
                            finalList.Add(charge);
                        }
                    }

                }


                //source from transit and Destination x partner x package
                var isLoadingAvailable = schedule.Details.FindAll(x => x.IsLoadingAvailable == true).ToList<ScheduleDetail>();

                foreach (ScheduleDetail detail in isLoadingAvailable)
                {
                    foreach (Package pck in pckList)
                    {
                        foreach (Partner prtner in partnerList)
                        {
                            VesselCharge charge = new VesselCharge()
                            {
                                ChargedAtId = chargedAtId,
                                ChargeAmount = 200,
                                ChargeDetail = "STD",
                                PackageId = pck.Id,
                                CurrencyId = 1,
                                CreatedBy = "senthil",
                                StartDate = detail.ExpDeparture,
                                EndDate = schedule.EstArrDestDate,
                                CreatedAt = new DateTime(),
                                DestinationPortId = schedule.DestinationPortId,
                                OriginPortId = detail.TransitPortId,
                                PartnerId = prtner.Id,
                                IsActive = false,
                                VesselScheduleId = schedule.Id,
                                ChargeType = "chargeType",
                                UpdatedAt = new DateTime(),
                                UpdatedBy = "senthil",
                                VesselSchedule = schedule,
                                Package = pck,
                                Partner = prtner,
                                Currency = currency,
                                DestinationPort = schedule.DestinationPort,

                                OriginPort = detail.TransitPort,
                                ChargedAt = chargedAt,



                            };
                            finalList.Add(charge);
                        }
                    }

                }


                //transit 1 as source and transit 2...n as Destinaition x partner x package

                foreach (ScheduleDetail source in isLoadingAvailable)//this becomes source
                {
                    foreach (ScheduleDetail destination in isDeleiveryAvailableList)
                    {
                        if (source.Id != destination.Id && source.ExpArrival < destination.ExpArrival)
                        {
                            foreach (Package pck in pckList)
                            {
                                foreach (Partner prtner in partnerList)
                                {
                                    VesselCharge charge = new VesselCharge()
                                    {
                                        ChargedAtId = chargedAtId,
                                        ChargeAmount = 200,
                                        ChargeDetail = "STD",
                                        PackageId = pck.Id,
                                        CurrencyId = 1,
                                        StartDate = source.ExpDeparture,
                                        EndDate = destination.ExpArrival,
                                        CreatedBy = "senthil",
                                        CreatedAt = new DateTime(),
                                        DestinationPortId = destination.TransitPortId,
                                        OriginPortId = source.TransitPortId,
                                        PartnerId = prtner.Id,
                                        IsActive = false,
                                        VesselScheduleId = schedule.Id,
                                        ChargeType = "chargeType",
                                        UpdatedAt = new DateTime(),
                                        UpdatedBy = "senthil",

                                        VesselSchedule = schedule,
                                        Package = pck,
                                        Partner = prtner,
                                        Currency = currency,
                                        DestinationPort = destination.TransitPort, // _repository.FindSingle<Port>(x => x.Id == destination.TransitPortId),

                                        OriginPort = source.TransitPort,// _repository.FindSingle<Port>(x => x.Id == source.TransitPortId),
                                        ChargedAt = chargedAt,

                                    };
                                    finalList.Add(charge);


                                }
                            }
                        }

                    }
                }

            }
            return finalList;
        }

        public string StripParam(string strValue)
        {

            return strValue.ToString().Replace("}", string.Empty).Replace("}", string.Empty).Replace("code", string.Empty).Trim().ToUpper().ToString().
                Replace(@"{", string.Empty).Replace(@"""", string.Empty).Replace(":", string.Empty);

        }

    }
}
