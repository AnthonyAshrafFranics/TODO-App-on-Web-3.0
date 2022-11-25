import React, { useContext } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";

import { ToDoListContext } from "../context/ToDoListApp";
import Style from "../styles/index.module.css";

const Data = ({ allToDoList, allAddress, myList, change }: any) => {
  // console.log("allToDoList", allToDoList);

  return (
    <div className={Style.home_create_list}>
      {allToDoList?.length === 0 ? (
        <div className={Style.noData}>No Data</div>
      ) : (
        allToDoList?.map((val: any, i: any) => (
          <div key={i} className={Style.home_create_list_app}>
            <div className={Style.locl_list}>
              <AiFillLock className={Style.lock_color} />
              {val[2]}
            </div>
            {val[3] === false ? (
              <RiCloseFill
                onClick={() => change(val[1])}
                className={Style.iconClose}
              />
            ) : (
              <p className={Style.down}>Done</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Data;
