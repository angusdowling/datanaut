using Datanaut.Api.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Configure the application
builder
    .ConfigureServices()
    .ConfigureAuthentication()
    .ConfigureDatabase()
    .ConfigureDependencyInjection();

var app = builder.Build();

// Configure middleware and endpoints
app.ConfigureMiddleware().ConfigureEndpoints();

app.Run();
