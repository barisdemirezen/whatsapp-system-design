using Microsoft.AspNetCore.Mvc;
using receiver_api.service.Models;
using receiver_api.service.QueueServices;

namespace receiver_api.Controllers
{
    [ApiController]
    [Route("receiver")]
    public class ReceiverController : ControllerBase
    {
        private readonly IQueueService _queueService;
        public ReceiverController(IQueueService queueService)
        {
            _queueService = queueService;
        }

        [HttpPost]
        [Route("receive")]
        public async Task<IActionResult> Receive([FromBody] MessageRequest messageRequest)
        {
            await _queueService.PublishMessageAsync(messageRequest);
            return Ok();
        }
    }
}