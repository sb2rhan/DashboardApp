import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../modules/user/entities/user';

@Pipe({
  name: 'userShort'
})
export class UserShortPipe implements PipeTransform {
  transform(user: User) {
    return `${user?.firstName ?? ''} ${user?.middleName?.charAt(0) ?? ''} ${user?.lastName ?? ''} (${user?.email})`;
  }

}
