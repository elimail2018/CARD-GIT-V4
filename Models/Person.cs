using Card.utils;
using System;
using System.ComponentModel.DataAnnotations;

namespace Card.Models
{
	public class Person
	{
		[Key]
		public int DbID { get; set; }

		//only  ID / Name / birthdate are REQUIRED  
		[Required(ErrorMessage = "מספר זהות חובה")]
		[StringLength(9, MinimumLength = 9, ErrorMessage = "מספר זהות חייב להיות 9 ספרות")]
		public string IdNumber { get; set; }

		[Required(ErrorMessage = "שם שדה חובה")]
		[StringLength(20, MinimumLength = 2, ErrorMessage = "שם שגוי  - תווים 2-20 ")]
		public string Name { get; set; }

		[Required(ErrorMessage = "תאריך שדה חובה")]

		[DateOfBirth(MinAge = 0, MaxAge = 120, ErrorMessage ="נא להכניס גיל הגיוני")]
		public DateTime BirthDate { get; set; }

		[EmailAddress (ErrorMessage ="מייל לא תקין") ]
		public string Email { get; set; }//not required

		[StringLength(15, MinimumLength = 8, ErrorMessage = "מספר טלפון שגוי - תווים 8-15 ")]
		public String Phone{ get; set; } 
		
		
		public int? Gender { get; set; }////not required


	}
}
