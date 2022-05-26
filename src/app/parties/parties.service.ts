import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { PartyRepository } from './parties.repository';

@Injectable()
export class PartiesService {
  constructor(private partyRepository: PartyRepository) {}
  async create(createPartyDto: CreatePartyDto) {
    return await this.partyRepository.createAndSave(createPartyDto);
  }

  async findAll(filterObj) {
    return await this.partyRepository.findAll(filterObj);
  }
}
