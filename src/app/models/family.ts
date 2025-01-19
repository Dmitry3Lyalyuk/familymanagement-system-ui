export interface IFamily {
  id: string;
  category: Category;
  name: string;
  brand: string;
}
 export enum Category {
  Annotation,
  Profile,
  Wall,
  Door,
  ElectricalEquipment,
  Column,
  Window,
}
