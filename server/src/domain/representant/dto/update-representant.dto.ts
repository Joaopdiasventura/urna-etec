import { PartialType } from "@nestjs/mapped-types";
import { CreateRepresentantDto } from "./create-representant.dto";

export class UpdateRepresentantDto extends PartialType(CreateRepresentantDto) {}
