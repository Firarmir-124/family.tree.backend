import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RoutePublicModule } from './routes/route.public.module';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RouteAuthModule } from './routes/route.auth.module';

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
      RouteAuthModule,
      NestJsRouterModule.register([
        {
          path: '/api/v1/',
          module: RoutePublicModule,
        },
        {
          path: '/api/v1/auth',
          module: RouteAuthModule,
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
