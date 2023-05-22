import { useEffect, useState } from "react";
import { GetCategoryResponseDto } from "../apis/response/category";

const usePagingHook = (COUNT: number) => {

  const [categoryList, setCategoryList] = useState<GetCategoryResponseDto[]>([]);
  const [viewList, setViewList] = useState<GetCategoryResponseDto[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onPageHandler = (page: number) => {
    setPageNumber(page);
  
    const tmpList: (GetCategoryResponseDto)[] = [];

    const startIndex = COUNT * (page - 1);
    const endIndex = COUNT * page - 1;

    for (let index = startIndex; index <= endIndex; index++) {
      if (categoryList.length < index + 1) break;
      tmpList.push(categoryList[index]);
    }

    setViewList(tmpList);
  }

  useEffect(() => {
    onPageHandler(pageNumber);
  }, [categoryList]);

  return {categoryList, viewList, pageNumber, setCategoryList, onPageHandler, COUNT};
}

export default usePagingHook;