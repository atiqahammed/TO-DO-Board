import { Fragment } from "react";
import Nav from "../Nav";
import Item from "./Item";
import { ICategory } from "../../interfaces/iCategory";
import { ITask } from "../../interfaces/iTastItem";
import CategoryList from "./categoryList/CategoryList";

function ToDoMaster() {

  const categoryList: ICategory[] = [
    {
        id: 1,
        name: 'Back lock'
    },
    {
        id: 2,
        name: 'In progress'
    },
    {
        id: 3,
        name: 'Done'
    },
    {
        id: 4,
        name: 'Archived'
    },

  ]

  const task: ITask = {
    id: 2,
    name: 'name dfasdfasdf sdf asdfaaaaaaaa sdf asd fsad fas df asdf sadf asd f sdf',
    description: 'dgdsfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdf gsdfgsd fgsdfg sdfg sdfasd fasdfasdf sadf',
    expiryDate: '34/44/5677',
    category: categoryList[0]

  }

  return (
    <Fragment>
      <Nav/>
      <h1 className="text-3xl font-bold underline mb-4">
        Task List
      </h1>

      <div className="flex overflow-x-auto bg-grew-200">
        {/* {categoryList.map((category: ICategory, index) => {
                retrun (<Fragment></Fragment>)
        })} */}
        {/* <Item task={task}></Item>
        <Item task={task}></Item>
        <Item task={task}></Item> */}
        {/* <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList>
        <CategoryList category={category}></CategoryList> */}
        {categoryList.map((item, index) => {
            return (<Fragment key={`category-${index}`}>
                <CategoryList category={item}></CategoryList>
            </Fragment>);
        })}
      </div>
      

      
    </Fragment>
  )
}

export default ToDoMaster;