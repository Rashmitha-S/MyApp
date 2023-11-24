using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;
using myApp.Entities;
using myApp.Extensions;


namespace myApp.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Username{get;set;}
          [Required] public string KnownAs { get; set; }
    [Required] public string Gender { get; set; }
    [JsonConverter(typeof(DateOnlyJsonConverter))]
    public DateOnly DateOfBirth { get; set; } // Note this must be optional or the required validator will not work
    [Required] public string City { get; set; }
    [Required] public string Country { get; set; }


        [Required]
        [StringLength(8,MinimumLength =4)]
        public string Password{get;set;}

         public int getAge(){
            return DateOfBirth.CalculateAge();
        } 
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
