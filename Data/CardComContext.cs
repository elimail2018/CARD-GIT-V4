using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Card.Models
{
    public class CardComContext : DbContext
    {
        public CardComContext (DbContextOptions<CardComContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Person >()
                .HasIndex(u => u.IdNumber)
                .IsUnique();
        }


    }
}
