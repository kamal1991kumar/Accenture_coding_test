import { noop, isEmpty, cloneDeep } from "lodash";
export const filedValidations = (types, data) => {
  const result = {
    hasError: false,
    message: "",
  };
  for (let i = 0; i < types.length; i++) {
    if (types[i] === "required") {
      if (isEmpty(data.value)) {
        result.hasError = true;
        result.message = "required";
        break;
      }
    } else if (types[i] === "isuniq") {
      if (!data.isValidTitle) {
        result.hasError = true;
        result.message = "isuniq";
        break;
      }
    }
  }
  return result;
};

export const validationMessages = (fieldName, type = "") => {
  const message = {
    required: `${fieldName} should not be empty.`,
    isuniq: `${fieldName} should be uniq.`,
  };

  return isEmpty(type) ? "" : message[type];
};

export const modalFormSchema = {
  canSubmit: true,
  fileds: ["title", "body"],
  fieldsData: {
    title: {
      hasError: false,
      type: "input",
      value: "",
      handleChange: noop,
      validations: ["required", "isuniq"],
    },
    body: {
      hasError: false,
      type: "textarea",
      value: "",
      handleChange: noop,
      validations: ["required"],
    },
  },
};

export const formInfo = ({
  title,
  body,
  handleChange,
  isValidTitle,
  onTitleChange,
  isLoadingModal,
}) => {
  const formData = cloneDeep(modalFormSchema);
  formData.fieldsData.title.value = title;
  formData.fieldsData.title.value = body;

  if (!isLoadingModal) {
    formData.fieldsData.title.handleChange = (t) =>
      onTitleChange({
        title: t,
      });
    formData.fieldsData.body.handleChange = (b) =>
      handleChange({
        body: b,
      });
  }

  if (isLoadingModal) {
    return formData;
  }
  formData.fileds.forEach((filed) => {
    const { hasError, message } = filedValidations(
      formData.fieldsData[filed].validations,
      {
        value: formData.fieldsData[filed].value,
        isValidTitle,
      }
    );
    formData.fieldsData[filed] = {
      ...formData.fieldsData[filed],
      hasError,
      message: validationMessages(filed, message),
    };
  });

  formData.canSubmit = formData.fileds.every(
    (filed) => !formData.fieldsData[filed].hasError
  );

  return formData;
};
