using consumer_db_service.Consumers;
using consumer_db_service.service.DbServices;
using MassTransit;
using receiver_api.service.Models;

namespace consumer_db_service.Extensions
{
    public static class Configure
    {
        public static void ConfigureApplication(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IDbService, DbService>();

            builder.Services.AddHealthChecks();

            builder.Services.AddMassTransit(x =>
            {
                x.AddConsumer<MessageRequestConsumer>();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.ReceiveEndpoint("receive-message", e =>
                    {
                        e.ConfigureConsumer<MessageRequestConsumer>(context);
                    });
                });
            });
        }
    }
}
