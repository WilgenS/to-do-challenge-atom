import {Router} from "express";
import {
  profileUser,
  createUser,
  searchUser,
  getAllUsers,
  getAssignableUsers,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/assignable", getAssignableUsers);
router.get("/profile", profileUser);
router.get("/search/:term", searchUser);

export const userRoutes = router;
