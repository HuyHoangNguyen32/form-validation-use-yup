import * as yup from "yup";

/**
 * ##############################################
 *    ! 7.Handle when validation successfully
 * ##############################################
 */

// ! show image uploaded
function setBackgroundImage(parent, selector, imageUrl) {
  if (!parent) return;

    const element = parent.querySelector(selector);
    if (element) element.style.backgroundImage = `url("${imageUrl}")`;
}

// ! show success message after submit success
function showSuccessMessage() {
  const alert = document.querySelector(".alert");
  alert.classList.remove("d-none");

  setTimeout(() => {
    alert.classList.add("d-none");
  }, 5000);
}

// ! reset form data after submit success
function resetFormValues() {
  const form = document.querySelector("#demoForm");

  const emailField = document.querySelector('[name="email"]');
  emailField.value = "";

  const passwordField = document.querySelector('[name="password"]');
  passwordField.value = "";

  const retypePasswordField = document.querySelector('[name="retypePassword"]');
  retypePasswordField.value = "";

  const imageUploadField = document.querySelector('[name="image"]');
  imageUploadField.value = "";

  setBackgroundImage(document, "#postHeroImage", "");

  const field1 = form.querySelector(`[name="email"]`);
  if (field1) {
    field1.parentElement.classList.remove("was-validated");
  }
  const field2 = form.querySelector(`[name="password"]`);
  if (field2) {
    field2.parentElement.classList.remove("was-validated");
  }
}

/**
 * ##############################################
 *        ! 6.Validation when change input
 * ##############################################
 */
// ! validation for email and password
function initValidationOnChange(form) {
  ["email", "password"].forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (field) {
      field.addEventListener("input", (e) => {
        const newValue = e.target.value;
        validateFormField(form, { [name]: newValue }, name);
      });
    }
  });
}
// ! validation for image
function initUploadImage(form) {
  const uploadImage = form.querySelector('[name="image"]');
  if (!uploadImage) return;

  uploadImage.addEventListener("change", (e) => {
    console.log("selected image: ", e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setBackgroundImage(document, "#postHeroImage", imageUrl);

    validateFormField(
      form,
      { image: e.target.files[0] },
      "image"
    );
  });
}
// ! yup schema for validation form field
async function validateFormField(form, formValues, name) {
  try {
    // clear previous error
    setFieldError(form, name, "");

    const schema = getPostSchema();
    await schema.validateAt(name, formValues);
  } catch (error) {
    setFieldError(form, name, error.message);
  }

  // show validation error (if any)
  const field = form.querySelector(`[name="${name}"]`);
  if (field && !field.checkValidity()) {
    field.parentElement.classList.add("was-validated");
  }
}

/**
 * ##############################################
 *            ! 5.Show error message
 * ##############################################
 */
function setTextContent(parent, selector, text) {
  if (!parent) return;

  const element = parent.querySelector(selector);
  if (element) element.textContent = text;
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(element.parentElement, ".invalid-feedback", error);
  }
}

/**
 * ##############################################
 *      ! 4.Validation form use yup schema
 * ##############################################
 */
async function validatePostForm(form, formValues) {
  try {
    // reset previous errors
    ["email", "password", "retypePassword", "image"].forEach((name) =>
      setFieldError(form, name, "")
    );

    // start validation
    const schema = getPostSchema();
    await schema.validate(formValues, { abortEarly: false });

    // show message success when validation is complete
    showSuccessMessage();
  } catch (error) {
    console.log("Error Name: ", error.name);
    console.log(error.inner);

    const errorLog = {};

    if (error.name === "ValidationError" && Array.isArray(error.inner)) {
      for (const validationError of error.inner) {
        const name = validationError.path;

        // ignore if the field is already logged
        if (errorLog[name]) continue;

        // set field error and mark as logged
        setFieldError(form, name, validationError.message);
        errorLog[name] = true;
      }
    }
  }
  // add was-validated class to form element
  const isValid = form.checkValidity();
  if (!isValid) form.classList.add("was-validated");

  return isValid;
}

/**
 * ##############################################
 *              ! 3.Create yup schema
 * ##############################################
 */
function getPostSchema() {
  return yup.object().shape({
    email: yup
      .string()
      .required("please enter email")
      .email("please enter correct email format"),
    password: yup
      .string()
      .required("please enter password")
      .min(6, "password should have at least 6 characters"),
    retypePassword: yup
      .string()
      .required("please enter retype password")
      .oneOf([yup.ref("password")], "password not match"),
    image: yup
      .mixed()
      .test("required", "please select an image to upload", (file) =>
        Boolean(file?.name)
      )
      .test("max-3mb", "the image is too large (max 3mb)", (file) => {
        const fileSize = file?.size || 0;
        const MAX_SIZE = 3 * 1024 * 1024;
        return fileSize <= MAX_SIZE;
      }),
  });
}

/**
 * ##############################################
 *      ! 2.Get form values when submit form
 * ##############################################
 */
function getFormValues(form) {
  const formValues = {};
  const data = new FormData(form);

  for (const [key, value] of data) {
    formValues[key] = value;
  }

  return formValues;
}

/**
 * ##############################################
 *           ! 1.Handle when submit form
 * ##############################################
 */
function submitForm() {
  const form = document.getElementById("demoForm");
  if (!form) return;

  initValidationOnChange(form);
  initUploadImage(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formValues = getFormValues(form);

    const idValid = await validatePostForm(form, formValues);
    if (idValid) {
      // reset form
      // use callback function to call API
      // redirect to detail page
      resetFormValues();
    }
  });
}

(() => {
  submitForm();
})();
