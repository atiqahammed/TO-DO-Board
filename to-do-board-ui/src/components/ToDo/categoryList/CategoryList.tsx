import { ICategory } from "../../../interfaces/iCategory";
import { ITask } from "../../../interfaces/iTastItem";
import { resizeText } from "../../../utils/resizeText";
import Item from "./Item";

function CategoryList(props: {category: ICategory}) {
    const {category} = props;

    const maxNameSize = 20;

    const task: ITask = {
        id: category.id + 10,
        name: 'name dfasdfasdf sdf asdfaaaaaaaa sdf asd fsad fas df asdf sadf asd f sdf',
        description: 'dgdsfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdf gsdfgsd fgsdfg sdfg sdfasd fasdfasdf sadf',
        expiryDate: '34/44/5677',
        category: category
    }


    const allowDrop = (event: any) => {
        event.preventDefault();
        console.log('ondrop handle');
    }

    const drag = (ev: any) => {
        console.log('drag')
        console.log(ev);
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const drop = (ev: any) => {
        ev.preventDefault();

        console.log(ev);

        console.log('------------------------');
        console.log(ev.target)

        if(ev && ev.target && ev.target.id && ev.target.id.includes('category')) {
            console.log('drop --- ')
            var data = ev.dataTransfer.getData("text");
            console.log('data -- ')
            console.log(data)
            console.log('data -- ')
            ev.target.appendChild(document.getElementById(data));
        }
    }

    return (
        <div id={`category-${category.id}`} onDrop={drop} onDragOver={allowDrop} className="border-zinc-800 rounded-md min-w-[25%] max-w-md bg-slate-300 p-2 m-1 pb-20">
            <h1 className="text-2xl font-bold">{resizeText(category.name ?? "", maxNameSize)}</h1>
            <div id={`item-${category.id+10}`} draggable={true} onDragStart={drag}><Item task={task}></Item></div>
            
        </div>
    )
  }
  
export default CategoryList;