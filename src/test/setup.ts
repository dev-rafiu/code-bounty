import "@testing-library/jest-dom/jest-globals";

// jsdom implements neither the Pointer Capture API nor scrollIntoView; Radix
// primitives (Select, DropdownMenu, Popover) call into both when opening.
Element.prototype.hasPointerCapture = () => false;
Element.prototype.setPointerCapture = () => {};
Element.prototype.releasePointerCapture = () => {};
Element.prototype.scrollIntoView = () => {};
