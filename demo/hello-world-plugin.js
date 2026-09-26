/**
 * Minimal OpenSCD plug-in.
 *
 * The host sets `config` when the element is created.
 * `{ "name": "Harry" }` renders "Hello Harry!".
 * No config, or no string `name`, renders "Hello World!".
 */
export default class HelloWorldPlugin extends HTMLElement {
  constructor() {
    super();
    this.show('World');
  }

  set config(value) {
    const name =
      value &&
      typeof value === 'object' &&
      typeof value.name === 'string' &&
      value.name.trim()
        ? value.name.trim()
        : 'World';
    this.show(name);
  }

  show(name) {
    const heading = document.createElement('h1');
    heading.textContent = `Hello ${name}!`;
    this.replaceChildren(heading);
  }
}
