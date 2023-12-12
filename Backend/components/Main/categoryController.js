const DbConnection = require("../../db");

require("dotenv").config();

module.exports = {
  Categories: async (req, res) => {
    try {
      const result = await DbConnection.query(
        "SELECT * FROM business_category"
      );
      res.status(200).send({
        message: "Categories successfully retrieved",
        data: result[0],
      });
    } catch (error) {
      console.error("Error retrieving categories", error);
      res.status(500).send("Internal Server Error.");
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const result = await DbConnection.query(
        "SELECT id, name, description, image_url FROM business_category"
      );

      const categoriesWithImages = result[0].map((category) => {
        const imageFilename = category.image_url;
        const image_url = imageFilename ? `/uploads/${imageFilename}` : null;

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          image_url: image_url,
        };
      });

      res.status(200).send({
        message: "Categories successfully retrieved",
        data: categoriesWithImages,
      });
    } catch (error) {
      console.error("Error retrieving categories", error);
      res.status(500).send("Internal Server Error.");
    }
  },
  getCategoryDetails: async (req, res) => {
    try {
      const { categoryNames } = req.body;

      if (
        !categoryNames ||
        !Array.isArray(categoryNames) ||
        categoryNames.length === 0
      ) {
        return res
          .status(400)
          .send("Invalid or missing categoryNames parameter.");
      }

      // Use the IN clause to filter by multiple categories
      const result = await DbConnection.query(
        `SELECT
          e.id AS entity_id,
          e.name AS entity_name,
          e.address1,
          e.address2,
          e.village_city_town,
          e.district,
          e.state,
          e.country,
          e.capacity,
          e.storage_products,
          e.sector,
          e.scheme_name,
          e.construction_year,
          e.manager_name,
          e.manager_mobile,
          e.entity_landline,
          e.longitude,
          e.latitude,
          e.created_date AS entity_created_date,
          e.updated_date AS entity_updated_date,
          c.id AS category_id,
          c.name AS category_name,
          c.description,
          c.created_date AS category_created_date,
          c.updated_date AS category_updated_date
        FROM entities e
        JOIN business_category c ON e.business_category_id = c.id
        WHERE c.name IN (?)`,
        [categoryNames]
      );

      res.status(200).send({
        message: "Categories successfully retrieved",
        data: result[0],
      });
    } catch (error) {
      console.error("Error retrieving categories", error);
      res.status(500).send("Internal Server Error.");
    }
  },
};
