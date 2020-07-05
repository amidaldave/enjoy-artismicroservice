import { AdminEntity } from 'nestjs-admin'
import { UserDto } from '../dtos/user.dto';

export class UserAdmin extends AdminEntity {
  entity = UserDto;
  listDisplay = ['id', 'email', 'password'];
  searchFields = ['email', 'password'];
}