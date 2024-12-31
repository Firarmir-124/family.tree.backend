import { FamilyTree } from '../entities/familyTree.entity';

export interface FamilyTreeType extends FamilyTree {
  _id: string;
}

export interface FamilyTreeMutationType extends FamilyTreeType {
  children: FamilyTreeMutationType[];
}

export interface QueryFamilyType {
  name?: { $regex: string; $options: string };
}
