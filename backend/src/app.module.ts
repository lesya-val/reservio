import { Module } from "@nestjs/common";
import { RestaurantsModule } from "./modules/restaurants/restaurants.module";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from "./modules/users/users.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { AuthModule } from "./shared/auth/auth.module";
import { HallsModule } from "./modules/halls/halls.module";
import { TablesModule } from "./modules/tables/tables.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    RestaurantsModule,
    EmployeesModule,
    BookingsModule,
    HallsModule,
    AuthModule,
    TablesModule,
  ],
})
export class AppModule {}
