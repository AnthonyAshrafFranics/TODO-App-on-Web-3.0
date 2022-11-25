import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { ToDoListAddress, toDoListABI } from "./constant";

const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(ToDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();
export const ToDoListProvider = ({ children }: any) => {
  const [currentAccouunt, setCurrentAccouunt] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState();
  const [myList, setMyList] = useState([]);
  const [allAddress, setAllAddress] = useState([]);

  // ------------- CONNECTING METAMASK
  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return setError("Please install Metamask...");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (account.length) {
      setCurrentAccouunt(account[0]);
      console.log(account[0]);
    } else {
      setError("Please Install MetaMask & connect, reload...");
    }
  };

  // ---------------- CONNECT WALLET
  const connectWallet = async () => {
    console.log("helllo");

    if (!window.ethereum) return setError("Please install Metamask...");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccouunt(account[0]);
  };

  // ------------- INTRACTING WITH SMART CONTRACT
  const toDoList = async (message: any) => {
    try {
      // connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const createList = await contract.createList(message);

      createList.wait();
      location.reload();
    } catch (error) {
      setError("Something wrong creating list...");
    }
  };

  const getToDoList = async () => {
    try {
      // connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      // GET DATA
      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);
      // console.log("getAllAddress", getAllAddress);

      // getAllAddress.map(async (val: any) => {
      const getSingleData = await contract.getCreatorData();
      // console.log("getSingleData", getSingleData);
      if (getSingleData.length !== 0) {
        // allToDoList.push(getSingleData);
        setAllToDoList(getSingleData);
      }
      // });

      const allMessage = await contract.getMessage();
      setMyList(allMessage);
    } catch (error) {
      console.log("error", error);

      setError("Something wrong creating list...");
    }
  };

  // Toggle function
  const change = async (id: any) => {
    try {
      // connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const state = await contract.toggle(id);
      state.wait();
      console.log("state", state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnect,
        connectWallet,
        toDoList,
        getToDoList,
        change,
        error,
        currentAccouunt,
        allAddress,
        myList,
        allToDoList,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};
const ToDoListApp = () => {
  return <div>ToDoListApp</div>;
};

export default ToDoListApp;
