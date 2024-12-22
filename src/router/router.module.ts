import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RoutePublicModule } from './routes/route.public.module';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];
    imports.push(
      RoutePublicModule,
      NestJsRouterModule.register([
        {
          path: '/api/v1/',
          module: RoutePublicModule,
        },
      ]),
    );
    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
