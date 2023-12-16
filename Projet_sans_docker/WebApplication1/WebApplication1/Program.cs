using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);

// Ajoutez des services au conteneur.
builder.Services.AddControllers();
// En savoir plus sur la configuration de Swagger/OpenAPI à https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "App_user",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));

// Ajoutez cette ligne dans la méthode ConfigureServices de votre classe Startup
builder.Services.AddScoped<ConnexionBD>();

//builder.Services.AddSession();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

var app = builder.Build();

app.UseSession();

// Configurez le pipeline de requête HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("App_user");

app.UseAuthorization();
//app.UseSession();
app.MapControllers();

app.Run();
