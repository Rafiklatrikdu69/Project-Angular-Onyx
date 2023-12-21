using app_image_backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "App_user",
        policy =>
        {
            policy.WithOrigins("http://localhost:63001").AllowAnyMethod().AllowAnyHeader();
        }));
// Ajoutez cette ligne dans la méthode ConfigureServices de votre classe Startup
//builder.Services.AddScoped<ConnexionBD>();
builder.Services.AddScoped<ConnexionBD>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("App_user");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
