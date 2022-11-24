// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract ToDoList {
    uint public _idUser = 0;
    address public ownerOfContract;

    address[] public creators;
    string[] public message;
    uint[] public messageId;

    struct ToDoListApp {
        address account;
        uint userId;
        string message;
        bool completed;

    }

    event ToDoEvent(
        address indexed account,
        uint indexed userId,
        string message,
        bool completed
    );

    mapping(uint => ToDoListApp) public toDoListApps;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        uint idNumber = _idUser;

        toDoListApps[idNumber].account = msg.sender;
        toDoListApps[idNumber].message = _message;
        toDoListApps[idNumber].completed = false;
        toDoListApps[idNumber].userId = idNumber;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);

        emit ToDoEvent(
            msg.sender,
            idNumber,
            _message,
            false
        );
        inc();
    }

    function getCreatorData() public view returns(ToDoListApp[] memory){
        ToDoListApp[] memory temp = new ToDoListApp[](_idUser);
        uint count = 0;
        for(uint i = 0; i < _idUser; i++){
            ToDoListApp memory singleUserData = toDoListApps[i];
            if(singleUserData.account == msg.sender){
                temp[count] = singleUserData;
                count++;
            }
        }
        return temp;
    }

    function getAddress() external view returns(address[] memory){
        return creators;
    }

    function getMessage() external view returns(string[] memory){
        return message;
    }

    function toggle(uint _id) public {
        ToDoListApp storage singleUserData = toDoListApps[_id];
        singleUserData.completed = !singleUserData.completed;
    }
}