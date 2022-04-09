using receiver_api.service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace consumer_db_service.service.DbServices
{
    public interface IDbService
    {
        Task ProcessMessageAsync(MessageRequest messageRequest);
    }
}
