using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using Newtonsoft.Json;

namespace Clockwork.API.Controllers
{
    [Route("api/[controller]/{offset}")]
    public class CurrentTimeController : Controller
    {
        // GET api/currenttime
        [HttpGet]
        public IActionResult Get(int offset)
        {
            var utcTime = DateTime.UtcNow.AddHours(offset);
            var serverTime = DateTime.Now.AddHours(offset);
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            var returnVal = new CurrentTimeQuery
            {
                UTCTime = utcTime,
                ClientIp = ip,
                Time = serverTime
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
    }
}
