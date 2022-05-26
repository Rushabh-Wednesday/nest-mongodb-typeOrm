import { validate } from 'class-validator';
import { EntityRepository, MongoRepository } from 'typeorm';
import { CreatePartyDto } from './dto/create-party.dto';
import { Party } from './entities/party.entity';

@EntityRepository(Party)
export class PartyRepository extends MongoRepository<Party> {
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

  async findAll({ filterObj }) {
    try {
      let sort = {};
      const aggregateQuery = [];
      if (filterObj.search) {
        const regex = new RegExp(filterObj.search, 'i');
        const search = {
          $or: [
            {
              name: regex,
            },
            {
              email: regex,
            },
          ],
        };

        aggregateQuery.push({
          $match: search,
        });
      }
      if (filterObj.sortField) {
        sort[filterObj.sortField] = filterObj.sortField;
      } else {
        sort = { email: 1 };
      }
      aggregateQuery.push({
        $sort: sort,
      });
      if (filterObj.page) {
        aggregateQuery.push({
          $skip: (parseInt(filterObj.page) - 1) * filterObj.limit,
        });
      }
      if (filterObj.limit) {
        aggregateQuery.push({
          $limit: parseInt(filterObj.limit),
        });
      }

      aggregateQuery.push({
        $group: {
          _id: null,
          total_parties: { $sum: 1 },
          parties: {
            $push: {
              _id: '$_id',
              name: '$name',
              email: '$email',
              address: '$address',
            },
          },
        },
      });

      const result = await this.aggregate(aggregateQuery).toArray();
      return result;
    } catch (error) {
      return error;
    }
  }
}
