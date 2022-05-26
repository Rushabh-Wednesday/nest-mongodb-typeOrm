import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { PartiesService } from './parties.service';

@Controller('parties')
export class PartiesController {
  constructor(private partyService: PartiesService) {}

  @Post()
  async create(@Body() createPartyDto: CreatePartyDto) {
    return await this.partyService.create(createPartyDto);
  }

  @Post('/get-all')
  async findAll(@Body() filterObj) {
    return await this.partyService.findAll(filterObj);
  }
}
