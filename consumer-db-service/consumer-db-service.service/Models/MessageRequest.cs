using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// namespace consumer_db_service.service.Models
namespace receiver_api.service.Models // Masstransit only works if message namespace is same in producer and consumer
{
    public class MessageRequest
    {
        public string Message { get; set; }
    }
}
