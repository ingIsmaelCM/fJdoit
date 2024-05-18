import BaseRepository from "@/repositories/BaseRepository";
import {IAuth} from "@/interfaces/AuthInterfaces.ts";

export default class AuthRepository extends BaseRepository<IAuth> {
  endpoint: string = "auth";



  async requestCode(email:string): Promise<any>{
    return this.safeRun(() => {
      return this.Api.post('auth/password/recover',{email});
    });
  }
  async sendCode(email:string, code: string): Promise<any>{
    return this.safeRun(() => {
      return this.Api.put('auth/password/recover',{email, code});
    });
  }

  async resetPassword(data: IAuth){
    return this.safeRun(() => {
      return this.Api.put('auth/password/reset',data);
    });
  }
}
