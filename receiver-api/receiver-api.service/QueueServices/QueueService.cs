using MassTransit;
using receiver_api.service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace receiver_api.service.QueueServices
{
    public class QueueService : IQueueService
    {
        private readonly IBus _bus;
        public QueueService(IBus bus)
        {
            _bus = bus;
        }

        public async Task PublishMessageAsync(MessageRequest messageRequest)
        {
            var endpoint = await _bus.GetSendEndpoint(new Uri($"queue:receive-message")); // move queue name to appsettings.
            await endpoint.Send(messageRequest);
        }
    }
}
