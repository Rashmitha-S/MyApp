using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using myApp.Data;
using myApp.Extensions;
using myApp.Interface;
using myApp.Middleware;
using myApp.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// builder.Services.AddDbContext<DataContext>(opt=>{
//     opt.UseSqlite(builder.Configuration.GetConnectionString("defaultConnection"));
// });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddCors();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//                       builder =>
//                       {
//                           builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
//                           .AllowAnyHeader()
//                           .AllowAnyMethod()
//                           .AllowCredentials();
//                       });
// });

builder.Services.AddScoped<ITokenService,TokenService>();
 builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(Options=>{
    Options.TokenValidationParameters=new TokenValidationParameters
    {
        ValidateIssuerSigningKey=true,
        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
        ValidateIssuer=false,
        ValidateAudience=false
    };
 });

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// if(builder.Environment.IsDevelopment()){
//     app.UseDeveloperExceptionPage();
// }

// Configure the HTTP request pipeline.

//app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200/"));

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

 app.UseCors(MyAllowSpecificOrigins);
//app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.UseAuthorization();
app.UseAuthorization();

app.MapControllers();

app.Run();
