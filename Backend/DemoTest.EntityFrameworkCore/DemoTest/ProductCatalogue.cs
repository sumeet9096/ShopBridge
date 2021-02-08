using System;
using System.Collections.Generic;
using System.Text;

namespace DemoTest.EntityFrameworkCore.DemoTest
{
    public class ProductCatalogue 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Image { get; set; }
        public string Descriptions { get; set; }
        public double Price { get; set; }
    }
}
