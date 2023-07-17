using Microsoft.EntityFrameworkCore;

namespace Darts.Services;

public class DartsDbContext : DbContext
{
    public DartsDbContext(DbContextOptions<DartsDbContext> options) : base(options){}
    
    public DbSet<DartsStatsModel> DartsStats { get; set; }
}