import type { Service, ServiceInput } from "../model/types";
import type {
    CreateServiceRequestDto,
    ServiceResponseDto,
    UpdateServiceRequestDto,
} from "./types";

export function mapServiceResponse(dto: ServiceResponseDto): Service {
    return {
        id: dto.id,
        serviceName: dto.serviceName,
        durationInMinutes: dto.durationInMinutes,
        price: dto.price,
        prepayment: dto.prepayment,
        preparationBeforeInMinutes: dto.preparationBeforeInMinutes,
        preparationAfterInMinutes: dto.preparationAfterInMinutes,
        totalOccupiedMinutes: dto.totalOccupiedMinutes,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
    };
}

export function mapServiceInputToCreateDto(
    input: ServiceInput,
): CreateServiceRequestDto {
    return {
        serviceName: input.serviceName,
        durationInMinutes: input.durationInMinutes,
        price: input.price,
        prepayment: input.prepayment,
        preparationBeforeInMinutes: input.preparationBeforeInMinutes,
        preparationAfterInMinutes: input.preparationAfterInMinutes,
    };
}

export function mapServiceInputToUpdateDto(
    input: ServiceInput,
): UpdateServiceRequestDto {
    return mapServiceInputToCreateDto(input);
}
