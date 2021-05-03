export type ImageData = {
  // Non-localized <img> attributes
  $: {
    // Image file path
    src: string;
  };
  // Describes the image using the alt attribute
  alt_text: string;
};

export type ButtonData = {
  // Button text value
  value: string;
  // If the value is empty, alt_text is required for a11y
  alt_text?: string;
  title?: string;
};
