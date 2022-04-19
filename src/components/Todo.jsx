import React, { useState } from "react";
import logo from "../images/logo.png";
import "../components/Todo.css";
const Todo = () => {
    const [inputdata, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit,setToggleSubmit] = useState(true);
    const [iseditItem,SetIsEditItem] = useState(null);

    const editItem=(id)=>{
        let newEditItems = items.find((elem)=>{
            return elem.id === id;
        });
        setToggleSubmit(false);
        setInputData(newEditItems.name);
        SetIsEditItem(id);
    };

    const deleteItem=(id)=>{
        const updatedItems= items.filter((elem)=>{
            return elem.id !== id;
        })
        setItems(updatedItems);
    };
    const addItem = () => {
        if (!inputdata) {
            alert("PLz Fill The Data");
        }else if(inputdata && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id === iseditItem){
                        return { ...elem,name:inputdata}
                    }
                    return elem;
                })
            );
            
            setToggleSubmit(true);
            setInputData("");
            SetIsEditItem(null);
        } else {
            const allInputData ={id: new Date().getTime().toString(),name:inputdata}
            setItems([...items, allInputData]);
            setInputData('');
        }
    };
    const removeAall=()=>{
        setItems([]);
    }
    
    return (
        <>
            <div className="main_div">
                <div className="child-div">
                    <figure>
                        <img src={logo} alt="todologo" />
                        <figcaption>Add Your List Here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="add note here..." value={inputdata} onChange={(event) => setInputData(event.target.value)} />
                        {
                            toggleSubmit ? <button className="add-btn" title="Add Note" onClick={addItem}>Add</button> : <button className="add-btn" title="Add Note" onClick={addItem}>Update</button>
                        }
                    </div>
                    <div className="showItems">
                        {
                            items.map((elem, ind) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}
                                        <i className="far fa-edit up-btn-icon" title="Edit Note" onClick={()=>editItem(elem.id)}></i>
                                        <i className="far fa-trash-alt add-btn-icon" title="Delete Note" onClick={()=>deleteItem(elem.id)}></i>
                                        </h3>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="showItems">
                        <button className="btn effect04"onClick={removeAall}><span>Remove All</span></button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Todo;