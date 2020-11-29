const FORM_CLASSNAME = 'NgxEditor__Popup--Form';
const FORMGROUP_CLASSNAME = 'NgxEditor__Popup--FormGroup';
const FORMGROUP_COL_CLASSNAME = 'NgxEditor__Popup--Col';
const FORMGROUP_LABEL_CLASSNAME = 'NgxEditor__Popup--Label';

interface FormDefaults {
  type: string;
  label: string;
  required: boolean;
  name: string;
  disabled?: boolean;
}

interface FormItemInput extends FormDefaults {
  type: 'text' | 'url';
  placeholder?: string;
  defaultValue?: string;
}

interface FormCheckboxInput extends FormDefaults {
  type: 'checkbox';
  defaultChecked: boolean;
}

export type FormInputs = (FormItemInput | FormCheckboxInput)[][];

export type OnSubmitData = { [key: string]: string | boolean };

interface FormViewOptions {
  inputs: FormInputs;
  onSubmit: (data: OnSubmitData) => void;
}

const createInputElement = (formItem: FormItemInput): HTMLElement => {
  const inputwrapper = document.createElement('div');

  inputwrapper.className = FORMGROUP_COL_CLASSNAME;

  const input = document.createElement('input');
  input.type = formItem.type ?? 'text';
  input.required = formItem.required ?? true;

  input.placeholder = formItem.placeholder ?? '';
  input.defaultValue = formItem.defaultValue ?? '';
  input.disabled = formItem.disabled ?? false;
  input.name = formItem.name;
  input.autocomplete = 'off';

  const label = document.createElement('label');
  label.textContent = formItem.label;
  label.className = FORMGROUP_LABEL_CLASSNAME;

  inputwrapper.appendChild(label);
  inputwrapper.appendChild(input);

  return inputwrapper;
};

const createCheckboxElement = (formItem: FormCheckboxInput): HTMLElement => {
  const label = document.createElement('label');
  label.textContent = formItem.label;

  label.style.display = 'flex';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.required = formItem.required ?? true;
  input.name = formItem.name;

  input.defaultChecked = formItem.defaultChecked ?? false;

  label.prepend(input);
  return label;
};

const serializeForm = (formEl: HTMLFormElement) => {
  const data = {};

  for (const el of Array.from(formEl.elements)) {
    if (el.tagName === 'INPUT') {
      const inputEl = el as HTMLInputElement;

      if (inputEl.type === 'checkbox') {
        data[inputEl.name] = inputEl.checked;
      } else {
        data[inputEl.name] = inputEl.value;
      }
    }
  }

  return data;
};

class FormView {
  dom: HTMLElement;

  constructor(options: FormViewOptions) {
    this.dom = document.createElement('form');
    this.dom.classList.add(FORM_CLASSNAME);
    this.dom.onsubmit = (e) => {
      const target = e.target as HTMLFormElement;
      e.preventDefault();
      const data = serializeForm(target);
      options.onSubmit(data);
      target.reset();
    };

    this.render(options.inputs);
  }

  render = (formInputs: FormInputs): void => {
    this.dom.innerHTML = '';

    formInputs.forEach(formGroup => {
      const groupEl = document.createElement('div');
      groupEl.classList.add(FORMGROUP_CLASSNAME);

      formGroup.forEach(formItem => {
        let formItemEl: HTMLElement | DocumentFragment;

        switch (formItem.type) {
          case 'text':
          case 'url':
            formItemEl = createInputElement(formItem);
            break;

          case 'checkbox':
            formItemEl = createCheckboxElement(formItem);
            break;

          default:
            return;
        }

        groupEl.appendChild(formItemEl);
      });

      this.dom.appendChild(groupEl);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    this.dom.appendChild(submitButton);
  }
}

export default FormView;
