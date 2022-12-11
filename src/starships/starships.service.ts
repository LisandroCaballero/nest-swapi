import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class StarshipsService {
  private readonly logger = new Logger('StarshipsService');

  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createStarshipDto: CreateStarshipDto) {
    try {
      const starship = this.starshipRepository.create(createStarshipDto);
      await this.starshipRepository.save(starship);
      return starship;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    const starships = this.starshipRepository.find({});
    return starships;
  }

  async findOne(term: string) {
    let starship: Starship;
    if (isUUID(term)) {
      starship = await this.starshipRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.starshipRepository.createQueryBuilder();
      starship = await queryBuilder
        .where('UPPER(name) =:name or UPPER(model) =:model', {
          name: term.toUpperCase(),
          model: term.toUpperCase(),
        })
        .getOne();
    }
    if (!starship)
      throw new NotFoundException(`Starship with ${term} not found`);

    return starship;
  }

  async update(id: string, updateStarshipDto: UpdateStarshipDto) {
    const starship = await this.starshipRepository.preload({
      id,
      ...updateStarshipDto,
    });

    if (!starship)
      throw new NotFoundException(`Starship with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(starship);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return starship;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const starship = await this.findOne(id);
    await this.starshipRepository.remove(starship);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
