pragma solidity ^0.4.24;

contract Store {
    address owner;
    uint256 itemId;
    uint256 orderId;

    enum itemStatus {InStock, OutOfStock}
    enum orderStatus {Confirmed, Shipped}

    struct Item {
        uint256 item;
        string name;
        uint256 inventory;
        uint256 price;
        itemStatus status;
        address seller;
    }

    struct Order {
        uint256 order;
        uint256 item;
        uint256 quantity;
        uint256 price;
        orderStatus status;
        address seller;
        address buyer;
    }

    //maps an item
    mapping(uint256 => Item) items;
    //maps an order
    mapping(uint256 => Order) orders;

    event InStock(uint256 itemId);
    event Shipped(uint256 orderId);

    //check if sender is owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //verify caller
    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    //check if paid amount is same as price
    modifier paid(uint256 _price) {
        require(msg.value == _price);
        _;
    }

    //check if item.state is in stock
    modifier inStock(uint256 _item) {
        require(items[_item].status == itemStatus.InStock);
        _;
    }

    //check if item.inventory is greater than or equal to order quantity
    modifier enoughStock(uint256 _item, uint256 _quantity) {
        require(items[_item].inventory >= _quantity);
        _;
    }

    //check if order.state is confirmed
    modifier confirmed(uint256 _order) {
        require(orders[_order].status == orderStatus.Confirmed);
        _;
    }

    constructor() public {
        owner = msg.sender;
        itemId = 0;
        orderId = 0;
    }

    function addItem(
        string memory _name,
        uint256 qty,
        uint256 _price
    ) public onlyOwner {
        itemId++;
        emit InStock(itemId);
        items[itemId] = Item({
            name: _name,
            item: itemId,
            inventory: qty,
            price: _price,
            status: itemStatus.InStock,
            seller: msg.sender
        });
    }

    function buyItem(uint256 id, uint256 qty)
        public
        payable
        inStock(id)
        enoughStock(id, qty)
        paid(items[id].price)
    {
        orderId++;
        uint256 _price = items[id].price;
        address _seller = items[id].seller;
        //update order
        orders[orderId] = Order({
            order: orderId,
            item: id,
            quantity: qty,
            price: _price,
            status: orderStatus.Confirmed,
            buyer: msg.sender,
            seller: _seller
        });
        //update inventory
        items[id].inventory = items[id].inventory - qty;
        //update item status
        if (items[id].inventory == 0) {
            items[id].status = itemStatus.OutOfStock;
        }
        //transfer funds
        items[id].seller.transfer(_price);
    }

    function getItem(uint256 id)
        public
        view
        returns (
            uint256 item,
            string memory name,
            uint256 inventory,
            uint256 price,
            string memory currentStatus,
            address seller
        )
    {
        uint256 status;
        item = items[id].item;
        name = items[id].name;
        inventory = items[id].inventory;
        price = items[id].price;
        status = uint256(items[id].status);
        if (status == 0) {
            currentStatus = "In Stock";
        }
        if (status == 1) {
            currentStatus = "Out of Stock";
        }
        seller = items[id].seller;
    }

    function getOrder(uint256 id)
        public
        view
        returns (
            uint256 order,
            uint256 item,
            string memory name,
            uint256 quantity,
            uint256 price,
            string memory currentStatus,
            address seller,
            address buyer
        )
    {
        uint256 status;
        order = orders[id].order;
        item = orders[id].item;
        name = items[item].name;
        quantity = orders[id].quantity;
        price = orders[id].price;
        status = uint256(orders[id].status);
        if (status == 0) {
            currentStatus = "Confirmed";
        }
        if (status == 1) {
            currentStatus = "Shipped";
        }
        seller = orders[id].seller;
        buyer = orders[id].buyer;
    }

    function shipOrder(uint256 id)
        public
        confirmed(id)
        verifyCaller(orders[id].seller)
    {
        orders[id].status = orderStatus.Shipped;
        emit Shipped(id);
    }

    function addInventory(uint256 id, uint256 qty)
        public
        verifyCaller(items[id].seller)
    {
        emit InStock(itemId);
        items[id].inventory = items[id].inventory + qty;
        items[id].status = itemStatus.InStock;
    }

    function updatePrice(uint256 id, uint256 _price)
        public
        verifyCaller(items[id].seller)
    {
        items[id].price = _price;
    }
}
