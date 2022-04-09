using consumer_db_service.service.Enums;
using consumer_db_service.service.Models;
using MassTransit;
using receiver_api.service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace consumer_db_service.service.DbServices
{
    public class DbService : IDbService
    {
        private readonly IBus _bus;
        public DbService(IBus bus)
        {
            _bus = bus;
        }
        public async Task ProcessMessageAsync(MessageRequest messageRequest)
        {
            // write to database or something else

            // Some operations
            var endpoint = await _bus.GetSendEndpoint(new Uri($"queue:message-status-sent")); // move queue name to appsettings.
            await endpoint.Send(new MessageStatus
            {
                Message = messageRequest.Message,
                MessageStatusType = MessageStatusTypes.SENT
            });
        }
    }
}
