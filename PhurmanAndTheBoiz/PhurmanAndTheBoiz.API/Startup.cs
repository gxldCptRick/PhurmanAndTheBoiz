using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PhurmanAndTheBoiz.DAL.Models;
using PhurmanAndTheBoiz.DAL.Services;
using PhurmanAndTheBoiz.DAL.Services.Implementations;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PhurmanAndTheBoiz.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private JwtBearerEvents GenereateJWTEvents()
        {
            return new JwtBearerEvents
            {
                OnTokenValidated = context =>
                {
                    var userService = context.HttpContext.RequestServices.GetRequiredService<IUserManager>();
                    var userId = context.Principal.Identity.Name;
                    var user = userService.GetUserById(userId);
                    if (user == null)
                    {
                        // return unauthorized if user no longer exists
                        context.Fail("Unauthorized");
                    }
                    return Task.CompletedTask;
                }
            };
        }

        private string Secret { get; } = "okay fermin lets get super cereal this time around";

        private void AddJWTAuthentication(IServiceCollection services)
        {
            var key = Encoding.ASCII.GetBytes(Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = GenereateJWTEvents();
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        private void AddSecurityPolicies(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, new string[] { "Admin" }));
                options.AddPolicy("GameMaster", policy => policy.RequireClaim(ClaimTypes.Role, new string[] { "DM", "GameMaster" }));
                options.AddPolicy("Players", policy => policy.RequireClaim(ClaimTypes.Role, new string[] { "Player" }));
            });
        }

        private void ConfigureCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins(@"*")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureCors(services);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            AddJWTAuthentication(services);
            AddSecurityPolicies(services);
            var mongoDbService = new MongoDnDService(mongoConnectionString: Configuration["connections:mongo_connection:string"], database: Configuration["connections:mongo_connection:database"]);
            var mangoUserService = new MongoUserService(mongoConnectionString: Configuration["connections:mongo_connection:string"], database: Configuration["connections:mongo_connection:database"]);
            services.AddSingleton<IUserManager>(mangoUserService);
            services.AddSingleton<IDnDService>(mongoDbService);
            CreateDefaultAdminAccounts(mangoUserService);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseCors("CorsPolicy");
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }

        private void CreateDefaultAdminAccounts(IUserManager userManager)
        {
            var users = userManager.GetAllUsers();
            if (!users.Any(u => u.Username == "SUPER KAMI GURU"))
            {
                var user = new User()
                {
                    FirstName = "Piccolo",
                    LastName = "Kami",
                    Username = "SUPER KAMI GURU",
                    Password = "#Team3Star"
                };

                userManager.CreateUser(user, user.Password);
                var createdUser = userManager.GetAllUsers().Single(u => u.Username == user.Username);
                if (createdUser.Id != null)
                {
                    userManager.AddUserToRole(createdUser.Id, "Admin");
                }
            }
        }

    }
}
