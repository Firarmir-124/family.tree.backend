import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FamilyTreeEntity } from './entities/familyTree.entity';
import { FamilyTreeRepository } from './repository/familyTree.repository';
import { FamilyTreeService } from './services/familyTree.service';

@Module({
  imports: [MongooseModule.forFeature([FamilyTreeEntity])],
  providers: [FamilyTreeRepository, FamilyTreeService],
  exports: [MongooseModule, FamilyTreeRepository, FamilyTreeService],
})
export class FamilyTreeModule {}
