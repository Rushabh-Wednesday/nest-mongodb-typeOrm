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
}
