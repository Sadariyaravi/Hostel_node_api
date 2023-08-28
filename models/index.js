const Role = require("../models/role");
const User = require("../models/User");
const Post = require("../models/Post");
const College = require("./collages");
const Course = require("./courses");
const collage_courses = require("./collage_courses");
const AdmissionDetail = require("./AdmissionFormDetail");
Role.hasMany(User, {
  foreignKey: "UserRoleID",
});
User.hasMany(Post, {
  foreignKey: "PostedBy",
});
Course.hasMany(collage_courses, {
  foreignKey: "courseId",
});
College.hasMany(collage_courses, {
  foreignKey: "collageId",
});
Course.hasMany(AdmissionDetail, {
  foreignKey: "CourseId",
});
College.hasMany(AdmissionDetail, {
  foreignKey: "CollageId",
});
