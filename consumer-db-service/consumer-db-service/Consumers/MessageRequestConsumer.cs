using consumer_db_service.service.DbServices;
using MassTransit;
using receiver_api.service.Models;

namespace consumer_db_service.Consumers
{
    public class MessageRequestConsumer : IConsumer<MessageRequest>
    {
        private readonly IDbService _dbServices;
        public MessageRequestConsumer(IDbService dbServices)
        {
            _dbServices = dbServices;
        }
        public async Task Consume(ConsumeContext<MessageRequest> context)
        {
            await _dbServices.ProcessMessageAsync(context.Message);
        }
    }
}
