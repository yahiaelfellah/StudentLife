export class Flame {
    value: number
    Time: string
    deviceId: string

}
export class Temperature {
    value: number
    Time: string
    deviceId: string

}
export class Gas {
    value: number
    Time: string
    deviceId: string

}
export class Accelorometer {
    Time: string
    deviceId: string
    value: AccelorometerValue
}

export class AccelorometerValue {
    Ax: number;
    Ay: number;
    Az: number;
    Gx: number;
    Gy: number;
    Gz: number;
}

export class Status {
    Status: string
    Time: string
}