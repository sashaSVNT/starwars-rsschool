export type PersonResult = {
  description: string;
  properties: PersonAttributes;
  uid: string;
  _id: string;
};

export type PersonAttributes = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  skin_color: string;
  mass: string;
};
