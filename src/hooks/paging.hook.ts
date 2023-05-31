import { useEffect, useState } from "react";
import { GetCategoryResponseDto } from "../apis/response/category";
import { useCategoryListStore } from "../stores";
import Category from "../interfaces/Category.interface";
import { GetMenuResponseDto } from "../apis/response/menu";

const usePagingHook = (COUNT: number) => {

  const [list, setList] = useState<( GetCategoryResponseDto | GetMenuResponseDto )[] | null>(null);
  const [viewList, setViewList] = useState< ( GetCategoryResponseDto | GetMenuResponseDto )[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onPageHandler = (page: number) => {
    if(list === null) return;
    setPageNumber(page);
  
    const tmpList: (GetCategoryResponseDto | GetMenuResponseDto )[] = [];

    const startIndex = COUNT * (page - 1);
    const endIndex = COUNT * page - 1;

    for (let index = startIndex; index <= endIndex; index++) {
      if (list.length < index + 1) break;
      tmpList.push(list[index]);
    }

    setViewList(tmpList);
  }

  useEffect(() => {
    onPageHandler(pageNumber);
  }, [list]);

  return {setList,viewList, pageNumber, onPageHandler, COUNT};
}

export default usePagingHook;