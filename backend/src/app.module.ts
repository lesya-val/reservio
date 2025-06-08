import { Module } from "@nestjs/common";
import { RestaurantsModule } from "./modules/restaurants/restaurants.module";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from "./modules/users/users.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { PreBookingsModule } from "./modules/pre-bookings/pre-bookings.module";
import { AuthModule } from "./shared/auth/auth.module";
import { HallsModule } from "./modules/halls/halls.module";
import { TablesModule } from "./modules/tables/tables.module";
import { NotificationsGateway } from "./modules/notifications/notifications.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    RestaurantsModule,
    EmployeesModule,
    PreBookingsModule,
    BookingsModule,
    HallsModule,
    AuthModule,
    TablesModule,

    NotificationsGateway,
  ],
})
export class AppModule {}
