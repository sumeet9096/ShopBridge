using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DemoTest.EntityFrameworkCore.Context;
using DemoTest.EntityFrameworkCore.DemoTest;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DemoTestDbContext _dbContext;
        public ProductController(DemoTestDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region Insert or Update Products
        [HttpPost("InsertorUpdate")]
        public void InsertorUpdate(ProductCatalogue input)
        {
            using (var transactiobn = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    if (input != null)
                    {
                        if (input.Id == 0)
                        {
                            _dbContext.ProductCatalogue.Add(new ProductCatalogue
                            {
                                Descriptions = input.Descriptions,
                                Image = input.Image,
                                Name = input.Name,
                                Price = input.Price
                            });
                        }
                        else
                        {
                            var productData = _dbContext.ProductCatalogue.FirstOrDefault(x => x.Id == input.Id);
                            if (productData != null)
                            {
                                productData.Image = input.Image != null ? input.Image : productData.Image;
                                productData.Price = input.Price;
                                productData.Name = input.Name;
                                productData.Descriptions = input.Descriptions;
                                _dbContext.Update(productData);
                            }
                        }
                        _dbContext.SaveChanges();
                        transactiobn.Commit();
                    }
                }
                catch (Exception ex)
                {
                    transactiobn.Dispose();
                    throw ex;
                }
            }
        }
        #endregion

        #region Get Product Grid List
        [HttpGet("GetAllList")]
        public List<ProductCatalogue> GetAllList()
        {
            try
            {
                return _dbContext.ProductCatalogue.ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Get Product Data By Id
        [HttpGet("GetById")]
        public ProductCatalogue GetById(int id)
        {
            try
            {
                var productData = _dbContext.ProductCatalogue.FirstOrDefault(x => x.Id ==id);
                if(productData != null)
                    return productData;
                else
                    return new ProductCatalogue();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Delete Prroduct data By Id
        [HttpDelete("DeleteById")]
        public void DeleteById(int id)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {

                    var producData = _dbContext.ProductCatalogue.FirstOrDefault(x => x.Id == id);
                    if (producData != null)
                    {
                        _dbContext.ProductCatalogue.Remove(producData);
                    }
                    _dbContext.SaveChanges();
                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw ex;
                }
            }
        }
        #endregion

    }
}
