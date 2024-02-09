import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyEntity } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async createCompany(
    createCompany: CreateCompanyDto,
  ): Promise<CompanyEntity> {
    return this.companyRepository.save(createCompany);
  }

  public async findOneCompany(id: number): Promise<CompanyEntity> {
    const companyOne = await this.companyRepository.findOneCompany(id);

    if (!companyOne) {
      throw new BadRequestException();
    }

    return companyOne;
  }

  public async updateCompany(
    updateCompany: UpdateCompanyDto,
    id: number,
  ): Promise<CompanyEntity> {
    const companyOne = await this.companyRepository.findOneCompany(id);

    if (!companyOne) {
      throw new BadRequestException();
    }

    return this.companyRepository.updateCompany(id, updateCompany);
  }

  public async removeCompany(id: number): Promise<number> {
    const companyOne = await this.companyRepository.findOneCompany(id);

    if (!companyOne) {
      throw new BadRequestException();
    }

    return this.companyRepository.removeOneCompany(id);
  }
}
