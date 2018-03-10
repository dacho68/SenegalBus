using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SenegalBus.Hub
{
    public class BusAvaibilityHub : Microsoft.AspNetCore.SignalR.Hub
    {
      public void SendBusInfo(BusInfo iBusInfo)
      {
        Clients.All.InvokeAsync("sendBusInfo", iBusInfo);
      }
      public void SendToAll(string name, string message)
      {
        Clients.All.InvokeAsync("sendToAll", name, message);
      }
  }
}
