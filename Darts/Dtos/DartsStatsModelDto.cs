namespace Darts.Dtos;

public class DartsStatsModelDto
{
    public Guid ForeignMatchId { get; set; }
    public DateOnly Date { get; set; }
    public string PlayerName { get; set; }
    public int[,,] SingleTurn { get; set; }
}