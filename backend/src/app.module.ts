import { Module } from "@nestjs/common";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
    EmployeesModule,
  ],
})
export class AppModule {}
