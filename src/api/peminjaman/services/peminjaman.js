'use strict';

/**
 * peminjaman service
 */

const { createCoreService } = require('@strapi/strapi').factories;


module.exports = createCoreService('api::peminjaman.peminjaman',({strapi}) => {
    return {
      async find(...args) {  
        // Calling the default core controller
        const { results, pagination } = await super.find(...args);
  
        return { results, pagination };
      },
  
      async create(...args) {  
        // Calling the default core controller
        try {
          const results = await super.create(...args);
        
         await Promise.all(args[0].data.buku.map( async (result) => {
          await strapi.entityService.create('api::peminjaman-detail.peminjaman-detail', {
            data: {
              peminjaman_id: {
                id:results.id
              },
              buku_id: {
                id: result
              }
            }
          })
       }))
          return {
            data: {
              ...results
            }
          }
        } catch (error) {
          throw new Error(error)
        }
      },
    }
    
  });