using System.ComponentModel.DataAnnotations;

namespace Darts;

public class DartsStatsModel
{
    [Key]
    public Guid MatchId { get; set; }
    public Guid ForeignMatchId { get; set; }
    public DateOnly Date { get; set; }
    public string PlayerName { get; set; }
    public int[,,] SingleTurn { get; set; }
}