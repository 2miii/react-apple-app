import { useEffect } from "react";

//모달창 이외의 영역을 클릭하면 닫게하기
export default function useOneClickOutsitde(ref, handler){
     useEffect(() => {
          const listener = (event) => {
               if(!ref.current || ref.current.contains(event.target) ){
                    return;
               }
               handler();
          }
          document.addEventListener('mousedown',listener);
     
       return () => {
          document.removeEventListener('mousedown',listener);
       };
     }, [ref, handler]);
     
}