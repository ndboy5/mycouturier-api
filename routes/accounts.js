const {Router} = require('express');
const { protect, authorize }  = require('../middleware/auth');

//import ccontroller functions
const  {getAccounts, getAccount, postAccount, deleteAccounts, deleteAccount ,updateAccount} = require('../controllers/account');

const router = Router();

// authorize only administrators to view and modify multiple accounts of everyone
//TODO: Add the update(put) functionality
router.route('/')
.get(protect, authorize('admin'), getAccounts)
.post(protect, authorize('admin'), postAccount)
.delete(protect, authorize('admin'), deleteAccounts);

//TODO: Add the post functionality
router.route('/:id')
.get(getAccount)
.put(protect, updateAccount)
.delete(protect, deleteAccount);

module.exports = router;