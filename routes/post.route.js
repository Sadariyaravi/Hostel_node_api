const router = require("express").Router();

const PostRouter = router;
const Postcontroller = require("../controllers/post.controller");
const authorized = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Allow anonymous
PostRouter.get("/Post", Postcontroller.GetPosts, async (req, res) => {
  res.status(200).send(res.locals.Posts);
});

// Authentication For all Routers except Get method.
// PostRouter.use(authentication);

// Post method with Authorization. only for Hosteladmin and superadmin
PostRouter.post(
  "/Post",
  upload.single("PostImageLink"),
  Postcontroller.AddPosts,
  async (req, res) => {
    res.status(200).send("Post added");
  }
);

// Put method with Authorization. only for Hosteladmin and superadmin
PostRouter.put(
  "/Post",
  authentication,
  authorized(["HostelAdmin", "SuperAdmin"]),
  Postcontroller.UpdatePosts,
  async (req, res) => {
    res.status(200).send(res.locals.updated_post);
  }
);

// Delete method with Authorization. only for Hosteladmin and superadmin
PostRouter.delete("/Post", Postcontroller.DeletePosts, async (req, res) => {
  res.status(200).send(res.locals.postdelete);
});

PostRouter.get(
  "/SearchByPostTitle",
  Postcontroller.SerachByPostTitle,
  async (req, res) => {
    res.status(200).send(res.locals.result);
  }
);
module.exports = PostRouter;
