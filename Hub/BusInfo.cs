using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace SenegalBus.Hub
{

    [Serializable]
    public class BusInfo
    {
      [DataMember]
      public int NumAvailable { get; set; }
      
    }
}
