import { filedValidations, validationMessages } from "./utils";

describe("Utils", () => {
  test("should return required message with give field name", () => {
    expect(validationMessages("Input", "required")).toEqual(
      "Input should not be empty."
    );
  });

  test("should return isuniq message with give field name", () => {
    expect(validationMessages("Input", "isuniq")).toEqual(
      "Input should be uniq."
    );
  });

  test("should return error when value is empty", () => {
    expect(
      filedValidations(["required"], {
        value: "",
      })
    ).toEqual({
      hasError: true,
      message: "required",
    });
  });

  test("should not return error when value is not empty", () => {
    expect(
      filedValidations(["required"], {
        value: "test",
      })
    ).toEqual({
      hasError: false,
      message: "",
    });
  });

  test("should return error when title is not uniq", () => {
    expect(
      filedValidations(["isuniq"], {
        isValidTitle: false,
      })
    ).toEqual({
      hasError: true,
      message: "isuniq",
    });
  });

  test("should not return error when title is uniq", () => {
    expect(
      filedValidations(["isuniq"], {
        isValidTitle: true,
      })
    ).toEqual({
      hasError: false,
      message: "",
    });
  });
});
