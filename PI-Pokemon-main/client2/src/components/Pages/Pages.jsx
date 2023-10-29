import { useDispatch, useSelector } from "react-redux"
import { changePage } from "../../Redux/actions";
import styles from './Pages.module.css'
import { useEffect } from "react";

export default function Pages(){
    const dispatch = useDispatch();
    const numPages = useSelector((state) => state.numPages)
    const page = useSelector((state) => state.page)

    const handlePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= numPages) {
          dispatch(changePage(pageNumber));
        }
      };    

    useEffect(() => {
        console.log(page);
    }, [page])

    const renderPageButtons = () => {
        const buttons = [];
        const maxButtons = 15;
        const startPage = Math.max(1, page - 7);
        const endPage = Math.min(numPages, startPage + maxButtons - 1 + 7);
    
        for (let i = startPage; i <= endPage; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePage(i)}
              className={i === page ? styles.activePageButton : styles.pageButton}
            >
              {i}
            </button>
          );
        }
        return buttons;
      };

    return (
        <div className={styles.container}>
        <button
          className={styles.pageButton}
          type="button"
          onClick={() => {
            if (page > 10) dispatch(changePage(page - 10));
            else dispatch(changePage(1));
          }}
        >
          {"<"}
        </button>
        {renderPageButtons()}
        <button
          className={styles.pageButton}
          type="button"
          onClick={() => {
            if (page < numPages - 10) dispatch(changePage(page + 10));
            else dispatch(changePage(numPages));
          }}
        >
          {">"}
        </button>
      </div>
    )
}