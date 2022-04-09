using receiver_api.service.Enums;

// namespace receiver_api.service.Models
namespace consumer_db_service.service.Models // Masstransit only works if message namespace is same in producer and consumer
{
    public class MessageStatus
    {
        public string Message { get; set; }
        public MessageStatusTypes MessageStatusType { get; set; }
    }
}
