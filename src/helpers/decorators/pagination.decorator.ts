import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';

export const Pagination = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const page = +request.query.page || 1;
    const orderBy = request.query.orderBy || null;
    const orderDirection = request.query.order === 'desc' ? 'desc' : 'asc';
    const perPage = +request.query.perPage || 10;
    return {
      page,
      perPage,
      orderBy,
      orderDirection,
    };
  },
);

export class PaginationDto {
  @ApiHideProperty()
  page: number;

  @ApiHideProperty()
  perPage: number;

  @ApiHideProperty()
  orderBy: string;

  @ApiHideProperty()
  orderDirection: 'desc' | 'asc';
}
