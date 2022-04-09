using consumer_db_service.service.Models;
using MassTransit;
using SocketIOClient;

namespace receiver_api.Consumers
{
    public class MessageSentConsumer : IConsumer<MessageStatus>
    {
        private readonly SocketIO io;
        public MessageSentConsumer()
        {
            io = new SocketIO("http://sender-socket:8081/");
            io.ConnectAsync().Wait();
        }
        //private readonly IDbService _dbServices;
        //public MessageSentConsumer(IDbService dbServices)
        //{
        //    _dbServices = dbServices;
        //}
        public async Task Consume(ConsumeContext<MessageStatus> context)
        {
            await io.EmitAsync("send-message", context.Message);
        }
    }
}
