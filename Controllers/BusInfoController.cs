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
    private readonly IHubContext<BusAvaibilityHub> mHubContext;
    private static BusInfo mBusInfo = new BusInfo();
    public BusInfoController(IHubContext<BusAvaibilityHub> ihubContext)
    {
      mHubContext = ihubContext;
    }
    //// GET: api/<controller>
    [HttpGet]
    public int Get()
    {
      return mBusInfo.NumAvailable;
    }


    //// POST api/<controller>
    [HttpPost]
    public void Post([FromBody]int value)
    {
      var hubContext = mHubContext;
      //var wBusInfo = new BusInfo()
      //{
      //  NumAvailable = value
      //};

      mBusInfo.NumAvailable = value;
      hubContext.Clients.All.InvokeAsync("sendBusInfo", mBusInfo);
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
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
  }
}
