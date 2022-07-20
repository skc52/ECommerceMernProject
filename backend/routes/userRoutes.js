const express = require("express");
const { default: isIBAN } = require("validator/lib/isIBAN");
const { registerAUser , loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changePassword, updateProfile, getAllUsers, getUser, updateUserRole, deleteUser} = require("../controller/userController");

const router = express.Router();

const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");


router.route("/register").post(registerAUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, changePassword);
router.route("/me/update").put(isAuthenticatedUser ,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizedRoles("admin"), getUser)
.put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;