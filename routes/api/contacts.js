const router = require('express').Router();

const { Contact } = require('../../database/db');

router.get('/', async (req, res) => {
  const contacts = await Contact.findAll();

  res.json({contacts: contacts});
})

router.get('/:id', async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);

  res.json({contact: contact});
})

router.post('/', async (req, res) => {
  const contact = await Contact.create(req.body);

  res.json({success: true, mess: 'Contact Created', contact: contact});
})

router.put('/:id', async (req, res) => {
  const contact = await Contact.update(req.body, {
    where: { id: req.params.id }
  });

  res.json({ success: true, mess: 'Contact Edited Successfully', contact: contact});
})

router.delete('/:id', async (req, res) => {
  const contact = await Contact.destroy({
    where: { id: req.params.id }
  });

  res.json({ success: true, mess: 'Contact Deleted Successfully', contact: contact});
})

module.exports = router;