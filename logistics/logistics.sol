// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

contract Logistics {
    address owner;
    uint256 orderId;
    uint256 public delivery_rate = 2800000000000000;

    enum orderStatus {Open, Confirmed, Picked, Delivered}

    struct Order {
        string pickup;
        string delivery;
        uint256 distance;
        orderStatus status;
        uint256 cost;
        address distributor;
        address logistics;
        uint256 deposits;
        uint256 payment;
    }

    //maps an Order
    mapping(uint256 => Order) orders;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //verify caller
    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    //check if paid amount is same as cost
    modifier amount(uint256 _cost) {
        require(msg.value == _cost);
        _;
    }

    //verify open status
    modifier open(uint256 _order) {
        require(orders[_order].status == orderStatus.Open);
        _;
    }

    //verify confirmed status
    modifier confirmed(uint256 _order) {
        require(orders[_order].status == orderStatus.Confirmed);
        _;
    }

    //verify picked status
    modifier picked(uint256 _order) {
        require(orders[_order].status == orderStatus.Picked);
        _;
    }

    constructor() public {
        owner = msg.sender;
        orderId = 0;
    }

    function deposit(uint256 id)
        public
        payable
        onlyOwner
        amount(orders[id].cost)
    {
        uint256 _amount = msg.value;
        orders[id].deposits = _amount;
    }

    function withdraw(uint256 id) public onlyOwner {
        orders[id].payment = orders[id].deposits;
        orders[id].deposits = 0;
        orders[id].logistics.transfer(orders[id].payment);
    }

    function createOrder(
        string memory _pickup,
        string memory _delivery,
        uint256 _distance
    ) public onlyOwner {
        orderId++;
        orders[orderId] = Order({
            pickup: _pickup,
            delivery: _delivery,
            distance: _distance,
            status: orderStatus.Open,
            cost: _distance * delivery_rate,
            distributor: msg.sender,
            logistics: 0,
            deposits: 0,
            payment: 0
        });
    }

    function confirmOrder(uint256 id) public open(id) {
        orders[id].status = orderStatus.Confirmed;
        orders[id].logistics = msg.sender;
    }

    function pickOrder(uint256 id)
        public
        confirmed(id)
        verifyCaller(orders[id].logistics)
    {
        orders[id].status = orderStatus.Picked;
    }

    function deliverOrder(uint256 id)
        public
        picked(id)
        verifyCaller(orders[id].logistics)
    {
        orders[id].status = orderStatus.Delivered;
    }

    function getOrder(uint256 id)
        public
        view
        returns (
            string memory pickup,
            string memory delivery,
            uint256 distance,
            string memory currentStatus,
            uint256 total_cost,
            address distributor,
            address logistics,
            uint256 deposits,
            uint256 payment
        )
    {
        uint256 status;
        pickup = orders[id].pickup;
        delivery = orders[id].delivery;
        distance = orders[id].distance;
        status = uint256(orders[id].status);
        if (status == 0) {
            currentStatus = "Open";
        }
        if (status == 1) {
            currentStatus = "Confirmed";
        }
        if (status == 2) {
            currentStatus = "Picked";
        }
        if (status == 3) {
            currentStatus = "Delivered";
        }
        total_cost = orders[id].cost;
        distributor = orders[id].distributor;
        logistics = orders[id].logistics;
        deposits = orders[id].deposits;
        payment = orders[id].payment;
    }
}
