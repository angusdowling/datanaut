using System.Reflection;
using System.Text;
using Datanaut.Api.Data;
using Datanaut.Api.Services;
using Datanaut.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Scrutor;

namespace Datanaut.Api.Configuration
{
    public static class WebApplicationBuilderExtensions
    {
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            return builder;
        }

        public static WebApplicationBuilder ConfigureAuthentication(
            this WebApplicationBuilder builder
        )
        {
            var jwtSecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
            if (string.IsNullOrEmpty(jwtSecretKey))
            {
                throw new InvalidOperationException(
                    "JWT_SECRET_KEY environment variable is not set"
                );
            }

            builder
                .Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtSecretKey)
                        ),
                        ValidateIssuer = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            if (
                                context.Request.Cookies.TryGetValue(
                                    "__datanaut_access_token",
                                    out var token
                                )
                            )
                            {
                                context.Token = token;
                            }
                            return Task.CompletedTask;
                        },
                    };
                });

            return builder;
        }

        public static WebApplicationBuilder ConfigureDatabase(this WebApplicationBuilder builder)
        {
            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException(
                    "DB_CONNECTION environment variable is not set"
                );
            }

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString)
            );

            return builder;
        }

        public static WebApplicationBuilder ConfigureDependencyInjection(
            this WebApplicationBuilder builder
        )
        {
            builder.Services.Scan(scan =>
                scan.FromAssemblies(Assembly.GetExecutingAssembly())
                    .AddClasses()
                    .AsImplementedInterfaces()
                    .WithScopedLifetime()
            );

            return builder;
        }
    }
}
