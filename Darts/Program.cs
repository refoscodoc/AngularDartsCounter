using Darts.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();

var serverVersion = new MySqlServerVersion(new Version(10, 11, 2));
builder.Services.AddDbContext<DartsDbContext>(o =>
        o.UseMySql(builder.Configuration["ConnectionStrings:DataAccessMySqlProvider"], serverVersion),
    // optionsLifetime: ServiceLifetime.Singleton);
    optionsLifetime: ServiceLifetime.Transient);

builder.Services.AddCors(o => o.AddPolicy("Darts", builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("Darts");
app.UseHttpsRedirection();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();