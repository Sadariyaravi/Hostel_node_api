const Posts = require("../models/Post");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");
const firebase = require("../firebase");
const multer = require("multer");
const { Op } = require("sequelize");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: multer.memoryStorage() });

const PostValidations = Joi.object().keys({
  PostTitle: Joi.string().required().min(4).max(120),
  PostBody: Joi.string().required().min(6),
  PostedBy: Joi.number().required(),
  PostImageLink: Joi.string(),
});

const GetPosts = async (req, res, next) => {
  try {
    Posts.findAll().then((allPost) => {
      res.locals.Posts = allPost;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddPosts = async (req, res, next) => {
  try {
    let { error } = PostValidations.validate(req.body);

    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    } else {
      try {
        const blob = firebase.bucket.file(req.file.originalname);

        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
        blobWriter.on("error", (err) => {
          console.log(err);
        });

        blobWriter.on("finish", () => {
          console.log("finish");
        });
        req.file.path = `https://firebasestorage.googleapis.com/v0/b/hostelmanagement2-f2006.appspot.com/o/${req.file.originalname}?alt=media`;
        blobWriter.end(req.file.buffer);
      } catch (error) {
        next({ error: { status: SERVER_ERROR, message: error } });
      }
      let Post = {
        PostTitle: req.body.PostTitle,
        PostBody: req.body.PostBody,
        PostedBy: req.body.PostedBy,
        PostImageLink: req.file.path,
      };
      Posts.create(Post);
      next();
    }
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const UpdatePosts = async (req, res, next) => {
  try {
    Posts.update(req.body, {
      where: {
        id: req.query.PostId,
      },
    });
    res.locals.updated_post = `Post Id:${req.query.PostId} Updated SuccessFully`;
    next();
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const DeletePosts = async (req, res, next) => {
  try {
    Posts.destroy({
      where: {
        id: req.query.PostId,
      },
    });
    res.locals.postdelete = `Post Id: ${req.query.PostId} is deleted successfully`;

    next();
  } catch (error) {
    if (error.errors) next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const SerachByPostTitle = async (req, res, next) => {
  try {
    Posts.findAll({
      where: {
        PostTitle: { [Op.iLike]: "%" + req.query.PostTitle + "%" },
      },
    }).then((SPost) => {
      res.locals.result = SPost;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

module.exports = {
  AddPosts,
  GetPosts,
  UpdatePosts,
  DeletePosts,
  SerachByPostTitle,
};
