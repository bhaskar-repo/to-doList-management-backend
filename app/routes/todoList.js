const appConfig = require('../../config/appConfig');
const todoListController = require('../controllers/todoListController');
const editItemController = require('../controllers/editItemController');
const editListController = require('../controllers/editListController');
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middlewares/auth');
/**
 * This method is used to define routes for this module
 * @author Bhaskar Pawar
 * @param {*} app 
 */
const setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/lists`;
    // list operations
    app.post(`${baseUrl}/create`, authMiddleware.isAuthorized, todoListController.createNewList);
    app.get(`${baseUrl}/:userId/all`, authMiddleware.isAuthorized ,todoListController.getAllLists);
    app.get(`${baseUrl}/:userId/:listId/edit`, authMiddleware.isAuthorized, editListController.getSingleList);
    app.post(`${baseUrl}/:userId/:listId/delete`, authMiddleware.isAuthorized, todoListController.deleteList);

    // item operations
    app.post(`${baseUrl}/:userId/:listId/:itemId/upload`, authMiddleware.isAuthorized, editItemController.uploadFileCloud);
    app.post(`${baseUrl}/:userId/:listId/add`, authMiddleware.isAuthorized, editListController.addItemToList);
    app.put(`${baseUrl}/:userId/:listId/:itemId/edit`, authMiddleware.isAuthorized, editItemController.editItemInList);
    app.get(`${baseUrl}/:userId/:listId/:itemId/edit`, authMiddleware.isAuthorized , editItemController.getSingleItem);    
    app.post(`${baseUrl}/:userId/:listId/:itemId/delete`, authMiddleware.isAuthorized , editListController.deleteItemfromList);
    app.post(`${baseUrl}/:userId/:listId/:itemId/markopen`, authMiddleware.isAuthorized , editListController.markItemIsOpen);
    app.post(`${baseUrl}/:userId/:listId/:itemId/markclose`, authMiddleware.isAuthorized , activityController.markItemIsClose);
    app.post(`${baseUrl}/:userId/:listId/:itemId/markdone`, authMiddleware.isAuthorized , editListController.markItemIsDone);

    //sub item operations
    app.post(`${baseUrl}/:userId/:listId/:itemId/add`, authMiddleware.isAuthorized, editItemController.addSubItemToItemList);
    app.post(`${baseUrl}/:userId/:listId/:itemId/:subItemId/delete`, authMiddleware.isAuthorized , editItemController.deleteSubItemfromItemsList);
    app.post(`${baseUrl}/:userId/:listId/:itemId/:subItemId/markdone`, authMiddleware.isAuthorized, editItemController.markSubItemDone);
    app.post(`${baseUrl}/:userId/:listId/:itemId/:subItemId/markclose`, authMiddleware.isAuthorized, activityController.markSubItemclose);
}

module.exports = {
    setRouter: setRouter
}