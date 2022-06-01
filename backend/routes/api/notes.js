const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Notebook, Tag } = require('../../db/models');

const router = express.Router();

//-----------------------NOTE VALIDATOR-----------------------
const validateNotes = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Title cannot be longer than 50 characters'),
  handleValidationErrors,
];

//-----------------------GET ALL NOTES-----------------------
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notes = await Note.findAll({
    where: { userId: userId }
  });
  return res.json(notes);
}));



module.exports = router;
