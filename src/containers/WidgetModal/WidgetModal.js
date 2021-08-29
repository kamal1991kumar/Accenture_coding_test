import { useSelector, useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { debounce } from "lodash";
import Modal from "../../components/modal";
import {
  editWidgetAction,
  toggleWidgetAction,
  updateWidgetAction,
  validateWidgetAction,
} from "../../store/actions/WidgetContainerAction";
import { FromElements } from "../../components/form/FormElements";
import { formInfo } from "../../helpers/utils";

export const WidgetModal = () => {
  const { editId, isValidTitle, editWidget, isLoadingModal } = useSelector(
    (state) => state.widgetReducer
  );
  const dispatch = useDispatch();
  const onTitleChange = useCallback(debounce(onFieldChange, 500), []);

  function onFieldChange(payload) {
    dispatch(validateWidgetAction({ editId, ...payload, id: editWidget.id }));
  }

  const { fileds, fieldsData, canSubmit } = formInfo({
    ...editWidget,
    isValidTitle,
    isLoadingModal,
    handleChange: (value) => dispatch(editWidgetAction(value)),
    onTitleChange,
  });

  return (
    <div key={editWidget.id} className="WidgetModal">
      <Modal
        onClose={() => dispatch(toggleWidgetAction({ editId: "" }))}
        onSave={() => dispatch(updateWidgetAction())}
        isSaveDisabled={!canSubmit}
      >
        {fileds.map((field) => (
          <div key={field} className="WidgetModal__row">
            <FromElements {...fieldsData[field]} />
          </div>
        ))}
      </Modal>
    </div>
  );
};
