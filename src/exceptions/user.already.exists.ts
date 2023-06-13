import { BadRequestException } from "@nestjs/common";
import { ErrorMessages } from "src/constants/constants";

export class UserAlreadyExists extends BadRequestException {
    constructor(error?: string) {
        super(ErrorMessages.alreadyExists, error)
    }
}