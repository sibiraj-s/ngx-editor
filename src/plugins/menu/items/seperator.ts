const SEPERATOR_CLASSNAME = 'NgxEditor__Seperator';

const getSeperator = (): HTMLElement => {
  const div = document.createElement('div');
  div.className = SEPERATOR_CLASSNAME;
  return div;
};

export default getSeperator;
