import { ReleaseDatePrecisionEnum } from "@/domain/constants";

export function dateFormatter(
    date: Date,
    precision: ReleaseDatePrecisionEnum | null = null,
    showTime: boolean = false,
) {
    switch (precision) {
        case null:
            return Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: showTime ? "short" : undefined,
            }).format(date);
        case ReleaseDatePrecisionEnum.year:
            return Intl.DateTimeFormat("pt-BR", {
                day: undefined,
                month: undefined,
                year: "numeric",
            }).format(date);
        case ReleaseDatePrecisionEnum.month:
            return Intl.DateTimeFormat("pt-BR", {
                day: undefined,
                month: "numeric",
                year: "numeric",
            }).format(date);
        case ReleaseDatePrecisionEnum.day:
            return Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: showTime ? "short" : undefined,
            }).format(date);
    }
}
