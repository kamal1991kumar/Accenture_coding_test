import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce, isEmpty, toString } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  loadDataAction,
  toggleWidgetAction,
} from "../../store/actions/WidgetContainerAction";
import WidgetBox from "../../components/widgetBox";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import WidgetModal from "../WidgetModal";

export const WidgetContainer = () => {
  const scrollRef = useRef();
  const { isLoading, widgetList, pager, editId } = useSelector(
    (state) => state.widgetReducer
  );
  const dispatch = useDispatch();
  const [isScrollTop, setIsScrollTop] = useState(false);

  const fetchData = (firstLoad = true) => {
    dispatch(loadDataAction(isScrollTop, firstLoad));
  };

  const onScrollChange = () => {
    const { clientHeight, scrollHeight, scrollTop } = scrollRef.current;
    const scrollY = clientHeight + scrollTop;
    if (scrollY >= scrollHeight - 1) {
      setIsScrollTop(false);
      fetchData();
    }
  };

  const onScrollMove = useCallback(debounce(onScrollChange, 500), [
    isScrollTop,
  ]);

  useEffect(() => {
    fetchData(false);
  }, []);

  useEffect(() => {
    const div = scrollRef.current;
    div.addEventListener("scroll", onScrollMove);
    return () => {
      div.removeEventListener("scroll", onScrollMove);
    };
  }, [onScrollMove]);

  return (
    <div className="widgetContainer">
      <div
        className="widgetContainer__scrollView"
        ref={scrollRef}
        data-testid="scrollRef"
      >
        {widgetList &&
          widgetList.map((widget, index) => {
            return (
              <WidgetBox
                {...widget}
                key={widget.id}
                handleEditClick={() =>
                  dispatch(toggleWidgetAction({ editId: index, id: widget.id }))
                }
              />
            );
          })}
        {isLoading ? <Loader /> : null}
      </div>
      <Pagination {...pager} />
      {!isEmpty(toString(editId)) && widgetList.length > 0 ? (
        <WidgetModal />
      ) : null}
    </div>
  );
};
