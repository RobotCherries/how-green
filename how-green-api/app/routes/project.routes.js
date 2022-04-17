const projectsController = require("../controllers/project.controller.js");
const router = require('express').Router()

// Create a new Project
router.post("/", projectsController.create);

// Get all Projects
router.get("/", projectsController.findAll);

// Get all published Projects
router.get("/published", projectsController.findAllPublished);

// Get a single Project with id
router.get("/:id", projectsController.findOne);

// Update a Project with id
router.put("/:id", projectsController.update);

// Delete a Project with id
router.delete("/:id", projectsController.delete);

// Delete all Projects
router.delete("/", projectsController.deleteAll);

module.exports = router;

