interface Hotel {
  // podem faltar certos atributos do JSON mas acho que vao ser estes todos
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: string;
  phone_number: string;
  email: string;

  // vai ser algo assim
  // https://stackoverflow.com/questions/54492562/angular-getting-property-from-json-object-and-displaying-it-as-image
  images: string[];
}
