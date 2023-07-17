using Darts.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Darts.Controllers;

[ApiController]
[Route("[controller]")]
public class DartsStatsController : ControllerBase
{

    private readonly ILogger<DartsStatsController> _logger;

    public DartsStatsController(ILogger<DartsStatsController> logger)
    {
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DartsStatsModel[]>> Get(Guid id)
    {
        await Task.Delay(2000);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<DartsStatsModel[]>> GetByDate(DateOnly date)
    {
        return Ok();
    }
    
    // for more complex queries the amount of data is so tiny that can be filtere on the UI side

    [HttpPost]
    public async Task<ActionResult<DartsStatsModel>> Post([FromBody]DartsStatsModelDto dto)
    {
        return Ok();
    }
}