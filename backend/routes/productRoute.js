const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview,
    getAdminProducts,

} = require("../controller/productController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const router = express.Router();

// router.route("/products").get(getAllProducts);
// router.route("/product/new").post(createProduct);
router.get("/products",getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts)
router.post("/admin/product/new",isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
module.exports = router;



const x  = {
    "name":"product1",
    "price": 1200,
    "description":"This is a sample product",
    "category": "Laptop",
    "images":{
        "public_id":"sample laptop",
        "url":"sampleUrl"
    }
}