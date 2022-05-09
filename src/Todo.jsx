import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Todo() {
  
  const [list, setList] = useState("");
  const [click, setClick] = useState(
[]
  );
  const [checkValue, setCheckValue] = useState(true);
  const [checkidx, setCheckidx] = useState("");
  const [sublist, setSublist] = useState("");
  const [subclick, setSubclick] = useState(
    []
  );
  const [compareid, setCompareid] = useState([])
  const [isChecked, setIsChecked] = useState({ checkbox: [] });

  // console.log("subclick", subclick)
  
  
  const change = (e) => {
    setList(e.target.value);
    // console.log(e.target.value);
  };
  
  const hendlechangesub = (e) => {
    setSublist(e.target.value);
  };
  // console.log("sublist", sublist);
  const newList = () => {
    if (list) {
      setClick((oldData) => {
        oldData = [...oldData, list];
    
        return [...oldData];
      });
      setList("");
    } else {
      alert("please enter list name");
    }
  };
  
  const subtest = (e, idx) => {

    
    
    const { name, value, id } = e.target;
    
    let sublists = [...subclick];
    // ("dkdslk", sublists)
    
    subclick.push({
      idx: id,
      sub: value
    });
    
    
    setSubclick(subclick)
    setCompareid(subclick.filter((data) => data.idx === id))
    setSublist("")
  };
  
  const delate = () => {
    const copyData = click;
    copyData.splice(0);
    setClick([...copyData]);
  };

  const hendlecheck = (e) => {
    const { value, checked } = e.target;
    setCheckValue(checked);
    // console.log("value", value);
  };
  const handleBoxChange = (event) => {
    const { value, checked } = event.target
    let { checkbox } = isChecked;
    if(checked){
      setIsChecked({ checkbox: [...checkbox, value] });

    }
    
    else{
            setIsChecked({ checkbox: checkbox.filter((event) => event !== value) })
    }
  }
  
  
  return (
    <div>
      <h1 className="text-center">Todo List</h1>
      <div className="text-center">
        <input
          type="text"
          value={list}
          placeholder="What to do?"
          className="mt-5 text-center"
          onChange={change}
        />

        <button className="btn btn-outline-primary mx-5" onClick={newList}>
          NewList
        </button>
      </div>
      <table className="table">
        <tbody>
          {click?.map((item, index) => {
            return (
              <tr>
                <div className="border">
                  <input
                    type="checkbox"
                    onChange={(e) => hendlecheck(e)}
                    onClick={() => setCheckidx(index)}
                    value={item}
                  />
                  <p>{item}</p>
                  
                </div>
               

                {checkValue === true && index === checkidx && (
                  <div>
                    <div>{compareid.length} of {isChecked.checkbox.length} complated</div>
                    {compareid?.map((item, idx) => {
                      if (item?.idx == checkidx) {
                        // console.log("sadfghgfdsaASDFGH")
                        return (
                          <>
                            <input type="checkbox"  value={item?.sub} onChange={handleBoxChange}/>
                            <p>{item?.sub}</p>
                          </>

                        )
                      }

                    })}
                    <input
                      type="text"
                      placeholder="What are the staps?"
                      value={sublist}
                      onChange={(e) => hendlechangesub(e, index)}
                      id={index}
                      name="sublistdsfsfasds"
                    />
                    <button id={index} name="sublistdsfsfasds" value={sublist} onClick={(e) => subtest(e, index)}>new stap</button>
                  </div>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="row justify-content-center aling-item-center">
        <div className="col-3">
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={delate}>
              clear all{" "}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
