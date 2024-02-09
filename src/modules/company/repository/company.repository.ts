import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

export class CompanyRepository extends Repository<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {
    super(companyRepository.target, companyRepository.manager, undefined);
  }

  public async createCompany(
    createCompany: CreateCompanyDto,
  ): Promise<CompanyEntity> {
    try {
      return this.companyRepository.save(createCompany);
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOneCompany(id: number): Promise<CompanyEntity> {
    try {
      return this.companyRepository.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateCompany(
    id: number,
    updateCompany: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    try {
      await this.companyRepository.update({ id }, updateCompany);
      return this.companyRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async removeOneCompany(id: number): Promise<number> {
    try {
      await this.companyRepository.delete(id);
      return id;
    } catch (e) {
      throw new HttpException(
        'ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
