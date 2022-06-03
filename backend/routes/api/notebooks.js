const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Notebook, Tag } = require('../../db/models');

const router = express.Router();

//-----------------------NOTEBOOK VALIDATOR-----------------------
const validateNotebooks = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name cannot be longer than 50 characters'),
  handleValidationErrors,
];

//-----------------------GET ALL NOTEBOOKS-----------------------
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notebooks = await Notebook.findAll({
    where: { userId: userId }
  });
  return res.json(notebooks);
}));


//-----------------------CREATE NOTEBOOK-----------------------
router.post("/", validateNotebooks, asyncHandler(async (req, res) => {
  const notebook = await Notebook.create(req.body);
  return res.json(notebook)
}))

//-----------------------GET ONE NOTEBOOK-----------------------
router.get("/:id", requireAuth, asyncHandler(async (req, res) => {
  const notebookId = parseInt(req.params.id, 10)
  const notebook = await Notebook.findByPk(notebookId);
  return res.json(notebook);
}));

//-----------------------DELETE NOTEBOOK-----------------------
router.delete("/:id", asyncHandler(async (req, res) => {
  const notebookId = parseInt(req.params.id, 10);
  const notebook = await Notebook.findByPk(notebookId)
  if (notebook) {
    await notebook.destroy()
    res.json({ message: 'Notebook has been deleted' })
  } else {
    res.json({ message: 'Failed to delete notebook' })
  }
}))




module.exports = router;
