import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "../entities/message.entity";
import {Repository} from "typeorm";
import {CreateMessageDto} from "../dto/create-message.dto";
import {UpdateMessageDto} from "../dto/update-message.dto";

export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(info: CreateMessageDto) {
    return this.messageRepository.create({
      ...info,
      created: new Date(),
    });
  }

  async findAll(find: {}, options = {}): Promise<MessageEntity[]> {
    return this.messageRepository.find({ where: find });
  }

  async getTotal(find: {}): Promise<number> {
    return this.messageRepository.count({ where: find });
  }

  async findOne(id: number): Promise<any> {
    return this.messageRepository.findOne({ where: { id } });
  }

  async update(id: number, info: UpdateMessageDto) {
    await this.messageRepository.update({ id }, info);
  }

  async remove(id: number) {
    await this.messageRepository.delete({ id });
  }
}
