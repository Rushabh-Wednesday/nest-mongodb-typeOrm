import { validate } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePartyDto } from './dto/create-party.dto';
import { Party } from './entities/party.entity';

@EntityRepository(Party)
export class PartyRepository extends Repository<Party> {
  async createAndSave(createPartyDto: CreatePartyDto) {
    try {
      const party = this.create(createPartyDto);
      const errors = await validate(party, {
        validationError: { target: false },
      });

      if (errors.length > 0) {
        throw errors;
      }
      return this.save(party);
    } catch (error) {
      return error;
    }
  }
}
