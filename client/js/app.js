var app = angular.module('mean', []);
app
    .constant('ENDPOINT', 'http://localhost:3000/api/')
    .service('ItemsModel', ItemsModel)
    .controller('MainController', MainController)

function ItemsModel($http, ENDPOINT) {
    var service = this;
    path = 'items/'
    
    function getUrl() {
        return ENDPOINT + path;
    }
    
    function getUrlForId(itemId) {
        return getUrl(path) + itemId;
    }

    service.all = function () {
        return $http.get(getUrl());
    };

    service.fetch = function (itemId) {
        return $http.get(getUrlForId(itemId));
    };

    service.create = function (item) {
        return $http.post(getUrl(), item);
    };

    service.update = function (itemId, item) {
        return $http.put(getUrlForId(itemId), item);
    };

    service.destroy = function (itemId) {
        return $http.delete(getUrlForId(itemId));
    };

}

function MainController($scope, ENDPOINT, ItemsModel) {
	$scope.ENDPOINT = ENDPOINT;
	var main = this;
    function getItems() {
      ItemsModel.all()
        .then(function (result) {
          main.items = result.data;
        });
    }
    main.items = [];
    getItems();

    function createItem(item) {
      ItemsModel.create(item)
          .then(function (result) {
              getItems();
              initCreateForm();
          });
    }
    function initCreateForm() {
        main.newItem = { name: '', description: '' };
      }
    main.createItem = createItem;
    initCreateForm();

    function deleteItem(itemId) {
        ItemsModel.destroy(itemId)
            .then(function (result) {
                getItems();
        });
    }

    main.deleteItem = deleteItem;

}