import React, { useState, useEffect, useContext } from "react";
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import Image from "next/image";

import { ToDoListContext } from "../context/ToDoListApp";
import Style from "../styles/index.module.css";
import Loading from "../loding.gif";
import Data from "../components/Data";

const Home = () => {
  const [message, setMessage] = useState("");
  const {
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
  }: any = useContext(ToDoListContext);
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Loading} alt="" width={50} height={50} />
        <div className={Style.connect}>
          {!currentAccouunt ? (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          ) : (
            <button>{currentAccouunt.slice(0, 20)}...</button>
          )}
        </div>
      </div>

      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h2>TODO History List</h2>
          <div>
            {myList.map((val: any, index: any) => (
              <div className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <p>{val.slice(0, 30)}...</p>
              </div>
            ))}
          </div>
        </div>
        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create BlockChain Todo List</h2>
            <div className={Style.home_create_input}>
              <input
                type="text"
                placeholder="Enter your Todo"
                onChange={(e) => setMessage(e.target.value)}
              />
              {currentAccouunt ? (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => toDoList()}
                />
              ) : (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => connectWallet()}
                />
              )}
            </div>
            <Data
              allToDoList={allToDoList}
              allAddress={allAddress}
              myList={myList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
