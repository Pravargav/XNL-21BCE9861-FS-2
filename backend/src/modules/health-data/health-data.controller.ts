import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HealthDataService } from './health-data.service';
import { CreateHealthDataDto, UpdateHealthDataDto } from './dto/health-data.dto';

@Controller('health-data')
export class HealthDataController {
  constructor(private readonly healthDataService: HealthDataService) {}

  @Post()
  create(@Body() createHealthDataDto: CreateHealthDataDto) {
    return this.healthDataService.create(createHealthDataDto);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.healthDataService.findByUserId(userId);
  }

  @Get('user/:userId/daily')
  findDailySummary(@Param('userId') userId: string, @Query('date') date: string) {
    return this.healthDataService.findDailySummary(userId, new Date(date));
  }

  @Get('user/:userId/weekly')
  findWeeklySummary(@Param('userId') userId: string) {
    return this.healthDataService.findWeeklySummary(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHealthDataDto: UpdateHealthDataDto) {
    return this.healthDataService.update(id, updateHealthDataDto);
  }
}