import { Module } from "@nestjs/common";
import { RestaurantsModule } from "./modules/restaurants/restaurants.module";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from "./modules/users/users.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { AuthModule } from "./shared/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
    EmployeesModule,
    BookingsModule,
    AuthModule,
  ],
})
export class AppModule {}
