using DemoTest.EntityFrameworkCore.DemoTest;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoTest.EntityFrameworkCore.Context
{
    public class DemoTestDbContext : DbContext
    {
        public DbSet<ProductCatalogue> ProductCatalogue { get; set; }

        public DemoTestDbContext(DbContextOptions<DemoTestDbContext> options)
       : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
