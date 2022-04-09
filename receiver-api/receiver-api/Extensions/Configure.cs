using MassTransit;
using receiver_api.Consumers;
using receiver_api.service.Models;
using receiver_api.service.QueueServices;

namespace receiver_api.Extensions
{
    public static class Configure
    {
        public static void ConfigureApplication(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IQueueService, QueueService>();

            builder.Services.AddHealthChecks();

            builder.Services.AddCors(o => o.AddPolicy("Policy", builder =>
            {
                builder
                .AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
            }));

            builder.Services.AddMassTransit(x =>
            {
                x.AddConsumer<MessageSentConsumer>();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.ReceiveEndpoint("message-status-sent", e =>
                    {
                        e.ConfigureConsumer<MessageSentConsumer>(context);
                    });
                });
            });
        }
    }
}
