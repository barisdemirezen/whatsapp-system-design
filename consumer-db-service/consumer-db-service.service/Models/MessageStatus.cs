using consumer_db_service.service.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace consumer_db_service.service.Models
{
    public class MessageStatus
    {
        public string Message { get; set; }
        public MessageStatusTypes MessageStatusType { get; set; }
    }
}
