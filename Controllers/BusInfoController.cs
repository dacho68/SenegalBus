using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SenegalBus.Hub;
using Microsoft.AspNetCore.SignalR;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SenegalBus.Controllers
{
  [Route("api/[controller]")]
  public class BusInfoController : Controller
  {
    private readonly IHubContext<BusAvaibilityHub> _hubContext;

    public BusInfoController(IHubContext<BusAvaibilityHub> ihubContext)
    {
      _hubContext = ihubContext;
    }
    //// GET: api/<controller>
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return new string[] { "value1", "value2" };
    }

    // GET api/<controller>/5
    //[HttpGet("[action]")]
    //public string Get(int id)
    //{
    //  return "value";
    //}

    //// POST api/<controller>
    [HttpPost]
    public void Post([FromBody]int value)
    {
      var hubContext = _hubContext;
      var wBusInfo = new BusInfo()
      {
        NumAvailable = value
      };
      hubContext.Clients.All.InvokeAsync("sendBusInfo", wBusInfo);
    }

    // PUT api/<controller>/5
    //[HttpPut("{id}")]
    //public void NumberBusAvail(int id, [FromBody]int value)
    //{
    //  var hubContext = _hubContext;
    //  var wBusInfo = new BusInfo()
    //  {
    //    NumAvailable = value
    //  };
    //  hubContext .Clients.All.InvokeAsync("SendBusInfo", wBusInfo);
    //}

    // DELETE api/<controller>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
