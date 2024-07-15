import BaseRepository from "@/repositories/BaseRepository.ts";
import { IUserView} from "@/interfaces/ModelInterfaces.ts";

export default class ProfileRepository extends BaseRepository<IUserView> {
    endpoint = "auth"
}