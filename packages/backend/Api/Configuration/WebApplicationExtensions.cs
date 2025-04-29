namespace Datanaut.Api.Configuration
{
    public static class WebApplicationExtensions
    {
        public static WebApplication ConfigureMiddleware(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            return app;
        }

        public static WebApplication ConfigureEndpoints(this WebApplication app)
        {
            app.MapControllers();
            return app;
        }
    }
}
