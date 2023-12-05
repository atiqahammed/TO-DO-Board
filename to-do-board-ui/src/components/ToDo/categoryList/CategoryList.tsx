import { ICategory } from "../../../interfaces/iCategory";
import { resizeText } from "../../../utils/resizeText";

function CategoryList(props: {category: ICategory}) {
    const {category} = props;

    const maxNameSize = 20;

    return (
        <div className="border-zinc-800 rounded-md min-w-[25%] max-w-md bg-slate-300 p-2 m-1">
            <h1 className="text-2xl font-bold">{resizeText(category.name ?? "", maxNameSize)}</h1>
            
        </div>
    )
  }
  
export default CategoryList;