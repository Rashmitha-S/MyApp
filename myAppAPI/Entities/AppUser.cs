

using System.Text.Json;
using System.Text.Json.Serialization;
using myApp.Extensions;

namespace myApp.Entities
{
    public class AppUser
    {
       // internal byte[] passwordHash;

        public int Id{get;set;}

 
        public string UserName {get;set;}


        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }=DateTime.UtcNow;
        public DateTime LastActive { get; set; }=DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<Photo> Photos { get; set; }=new();
        // public int getAge(){
        //     return DateOfBirth.CalculateAge();
        // } 
    }

    internal class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {private const string Format = "yyyy-MM-dd";

    public override DateOnly Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateOnly.ParseExact(reader.GetString(), Format, System.Globalization.CultureInfo.InvariantCulture);
    }

      

        public override void Write(System.Text.Json.Utf8JsonWriter writer, DateOnly value, System.Text.Json.JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(Format, System.Globalization.CultureInfo.InvariantCulture));
    }
    }
}


