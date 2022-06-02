const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Tag } = require('../../db/models');

const router = express.Router();

//-----------------------NOTE VALIDATOR-----------------------
const validateNotes = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Title cannot be longer than 50 characters'),
  handleValidationErrors
];

//-----------------------GET ALL NOTES-----------------------
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notes = await Note.findAll({
    where: { userId: userId }
  });
  return res.json(notes);
}));

//-----------------------CREATE NOTE-----------------------
router.post("/", validateNotes, asyncHandler(async (req, res) => {
  const note = await Note.create(req.body);
  return res.json(note)
}))

//-----------------------GET ONE NOTE-----------------------
router.get("/:id", requireAuth, asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.id, 10)
  const note = await Note.findByPk(noteId);
  return res.json(note);
}));

//-----------------------EDIT NOTE-----------------------
router.put("/:id", requireAuth, handleValidationErrors, asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = await Note.findByPk(noteId)

  note.userId = req.body.userId
  note.title = req.body.title
  note.content = req.body.content

  await note.save();
  return res.json(note)
}))

//-----------------------DELETE NOTE-----------------------
router.delete("/:id", asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = await Note.findByPk(noteId)
  if (note) {
    await note.destroy()
    res.json({ message: 'Note has been deleted' })
  } else {
    res.json({ message: 'Failed to delete note' })
  }
}))


module.exports = router;
