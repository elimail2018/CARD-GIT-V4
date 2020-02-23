using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Card.Models;
using Card.Data;
using System.Data.SqlClient;

namespace Card.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly CardComContext _context;
        private readonly IDataRepository<Person> _repo;

        public PersonsController(CardComContext context, IDataRepository<Person> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Persons
        [HttpGet]
        public IEnumerable<Person> GetPersons()
        {
            return _context.Persons.OrderByDescending(p => p.DbID);
        }

        // GET: api/Persons/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _context.Persons.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        // PUT: api/Persons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson([FromRoute] int id, [FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != person.DbID)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                _repo.Update(person);
                var save = await _repo.SaveAsync(person);
            }
            catch (DbUpdateException ex)
            {
                if (!PersonExists(id))
                {

                    return NotFound();
                }
                else
                {
                    string msg;
                    msg = duplicateExceptionHandler(ex);
                    if (msg != "")
                        return BadRequest(msg);
                    else
                        { throw; }

                }
            }

            return NoContent();
        }

        // POST: api/Persons
        [HttpPost]
        public async Task<IActionResult> PostPerson([FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(person);
            try
            {
                var save = await _repo.SaveAsync(person);
            }
            catch (DbUpdateException ex)
            {
                string msg;
                msg = duplicateExceptionHandler(ex);
                if (msg != "")
                    return BadRequest(msg);
                else 
                    { throw; }
                //handle suplicATE ID error

            }
           

            return CreatedAtAction("GetPerson", new { id = person.DbID }, person);
        }

        // DELETE: api/Persons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _context.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _repo.Delete(person);
            var save = await _repo.SaveAsync(person);

            return Ok(person);
        }

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok("Hello");
        }
        private bool PersonExists(int id)
        {
            return _context.Persons.Any(e => e.DbID == id);
        }


        public string duplicateExceptionHandler(Exception ex)
        {
            string validationMessage  ="";
            SqlException innerException = ex.InnerException as SqlException;
            if (innerException != null && (innerException.Number == 2627 || innerException.Number == 2601))
            {
                 validationMessage ="לא ניתן לבצע שמירה , כפילות נתונים";


            }

            return validationMessage;
        }
    }
}
