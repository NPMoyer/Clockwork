using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using System.Linq;
using System.Collections.Generic;

namespace Clockwork.API.Controllers
{
    public class CurrentTimeController : Controller
    {
        [Route("api/[controller]/{offset}/{timeZone}")]
        [HttpGet]
        public IActionResult Get(double offset, string timeZone)
        {
            var utcTime = DateTime.UtcNow.AddHours(offset);
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            var returnVal = new CurrentTimeQuery
            {
                UTCTime = utcTime,
                ClientIp = ip,
                Time = serverTime,
                TimeZone = timeZone
            };

            using (var db = new ClockworkContext())
            {
                db.CurrentTimeQueries.Add(returnVal);
                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }

            return Ok(returnVal);
        }

        [Route("api/[controller]/all")]
        [HttpGet]
        public IActionResult GetAll()
        {
            ClockworkContext db = new ClockworkContext();
            var val = new List<CurrentTimeQuery>();

            val.AddRange(db.CurrentTimeQueries.ToList());
            return Ok(val);
        }
    }
}
