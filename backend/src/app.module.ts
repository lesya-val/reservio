import { Module } from "@nestjs/common";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
    EmployeesModule,
    AuthModule,
  ],
})
export class AppModule {}
