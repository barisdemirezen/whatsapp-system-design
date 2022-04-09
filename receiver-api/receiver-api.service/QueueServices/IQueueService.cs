using receiver_api.service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace receiver_api.service.QueueServices
{
    public interface IQueueService
    {
        Task PublishMessageAsync(MessageRequest messageRequest);
    }
}
