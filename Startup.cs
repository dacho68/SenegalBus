using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SenegalBus.Hub;

namespace SenegalBus
{
  public class Startup
  {
    //public Startup(IConfiguration configuration)
    //{
    //  Configuration = configuration;
    //}


    public IHostingEnvironment HostingEnvironment { get; }
    public IConfiguration Configuration { get; }

    public Startup(IHostingEnvironment env, IConfiguration config)
    {
      HostingEnvironment = env;
      Configuration = config;
    }

    

  
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
      {

        if (HostingEnvironment.IsDevelopment())
        {
          builder
              .AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://senegalbus.azurewebsites.net");
        }
        else
        {
          builder
              .AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:5001");
        }


      }));


      services.AddSignalR();
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          HotModuleReplacement = true
        });
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }



      app.UseStaticFiles();
      app.UseCors("CorsPolicy");

      app.UseSignalR(routes =>
      {
        routes.MapHub<BusAvaibilityHub>("bushub");
      });

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");

        routes.MapSpaFallbackRoute(
                  name: "spa-fallback",
                  defaults: new { controller = "Home", action = "Index" });
      });


    }
  }
}
